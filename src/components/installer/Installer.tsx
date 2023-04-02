import styled from '@emotion/styled';
import { useEffect, useRef, useState } from 'react';
import { FileData } from './types';
import { v4 as uuidv4 } from 'uuid';
import {
  calculateDistanceBetweenPoints,
  generateFlightPath,
  getFolderPoint,
  getHeight,
  getPixelsPerTick,
  getPlanetPoint,
  getPositionOnQuadraticBezierPath,
  getQuadrantForDeltas,
  isPointOutsideWindow,
} from './helpers';
import File from './File';
import Earth from '../Earth/Earth';
import Folder from './Folder';

// Distance (from the center) for which the folder will open/close when a file
// approaches
const FOLDER_OPEN_RADIUS = 75;
const FOLDER_CLOSE_RADIUS = 25;
// Distance for which the folder will "inhale" nearby files
const FOLDER_GRAVITY_RADIUS = 50;

interface Props {
  width: number;
  isRunning?: boolean;
}

const Wrapper = styled.div<{ width: number }>`
  position: relative;
  display: flex;
  width: ${(props) => props.width}px;
  justify-content: space-between;
`;

const PlanetContainer = styled.div<{ size: number }>`
  position: relative;
  z-index: 4;
  width: ${(props) => props.size}px;
  height: ${(props) => props.size}px;
  display: flex;
  justify-content: center;
  align-items: center;
  pointer-events: none;
`;

const FolderContainer = styled.div<{ size: number }>`
  position: relative;
  width: ${(props) => props.size}px;
  height: ${(props) => props.size}px;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const Installer: React.FC<Props> = ({ width, isRunning }) => {
  const wrapperNode = useRef<HTMLDivElement>(null);
  const [files, setFiles] = useState<{ [id: string]: FileData }>({});
  const [isFolderOpen, setIsFolderOpen] = useState(false);

  const handleClickFile = (ev: MouseEvent, id: string) => {
    /**
     * Mark a file as "caught", unless the folder is in the middle of eating it
     */
    const { status } = files[id];

    if (status === 'being-captured') {
      return;
    }
  };

  useEffect(() => {
    let generationLoopId: number;
    const wrapperBoundingBox = wrapperNode.current?.getBoundingClientRect();

    const createFile = () => {
      const height = getHeight(width);
      const fileId = uuidv4();

      const startPoint = getPlanetPoint(width);
      const endPoint = getFolderPoint(width);

      setFiles({
        ...files,
        [fileId]: {
          id: fileId,
          x: startPoint.x,
          y: startPoint.y,
          status: 'autonomous',
          size: height * 0.2,
          flightPath: generateFlightPath(width, height, startPoint, endPoint),
        },
      });
    };

    const updateFile = (fileId: string, properties: Partial<FileData>) =>
      setFiles({ ...files, [fileId]: { ...files[fileId], ...properties } });

    const deleteFiles = (fileIds: string[]) => {
      const filesCopy = { ...files };
      fileIds.forEach((fileId) => delete filesCopy[fileId]);
      setFiles(filesCopy);
    };

    const fileGenerationLoop = () => {
      const fileIds = Object.keys(files);
      createFile();

      // Keep only the 2 most recent captured files
      const filesToDelete = fileIds
        .filter((id) => files[id].status === 'captured')
        .slice(0, -2);

      if (filesToDelete.length > 0) {
        deleteFiles(filesToDelete);
      }

      // After a 2-4 second delay, generate another file!
      const delay = Math.random() * 2000 + 2000;
      generationLoopId = window.setTimeout(fileGenerationLoop, delay);
    };

    const autonomouslyIncrementFile = (file: FileData) => {
      /**
       * Move autonomous files towards the folder, along their arcing path.
       */
      const pixelsPerTick = getPixelsPerTick(width);

      // We aren't actually storing the percentage through its journey.
      // Instead, we know its current X value, and the amount we want to
      // increment per tick.
      const planetPoint = getPlanetPoint(width);
      const folderPoint = getFolderPoint(width);

      // Get the number of pixels between the planet and folder
      const distanceBetweenEntities = folderPoint.x - planetPoint.x;

      // Our start position is the planet's center, and the total available
      // space is the distance between planet and folder.
      const transposedX = file.x - planetPoint.x;
      const transposedMax = width * (distanceBetweenEntities / width);

      const nextX = transposedX + pixelsPerTick;

      // This number between 0-1 tells us how far through our journey we are
      const ratioCompleted = nextX / transposedMax;

      const { x, y } = getPositionOnQuadraticBezierPath(
        file.flightPath,
        ratioCompleted
      );

      updateFile(file.id, { x, y });
    };

    const areFilesWithinFolderRange = (
      fileIds: Array<string>,
      range: number
    ) => {
      const folderPoint = getFolderPoint(width);

      return fileIds.some((id) => {
        const distance = calculateDistanceBetweenPoints(files[id], folderPoint);
        return distance < range;
      });
    };

    const handleFolderOpeningAndClosing = (activeFileIds: Array<string>) => {
      /**
       * As files approach the folder, it should open and close at specific
       * distances. This method handles that calculation.
       */

      const freeFlyingFileIds = activeFileIds.filter(
        (id) => files[id].status !== 'being-captured'
      );

      const fileIdsBeingCaptured = activeFileIds.filter(
        (id) => files[id].status === 'being-captured'
      );

      // When files get near the folder, the folder "mouth" opens up.
      if (
        !isFolderOpen &&
        areFilesWithinFolderRange(freeFlyingFileIds, FOLDER_OPEN_RADIUS)
      ) {
        setIsFolderOpen(true);
      }

      // If files are within "swallow range", the folder closes.
      // Alternatively, if they get too far away (if they escape), it should
      // also close.
      if (isFolderOpen) {
        const isWithinSwallowRange = areFilesWithinFolderRange(
          fileIdsBeingCaptured,
          FOLDER_CLOSE_RADIUS
        );

        const haveFilesEscaped =
          !isWithinSwallowRange &&
          areFilesWithinFolderRange(activeFileIds, FOLDER_OPEN_RADIUS);

        if (isWithinSwallowRange || haveFilesEscaped) {
          setIsFolderOpen(false);
        }
      }
    };

    const startCapturingNearbyFiles = () => {
      /**
       * Look for files that have just entered the Folder's gravity radius.
       * The file could be autonomous, or held by the user, or released in its
       * direction.
       */
      const fileIds = Object.keys(files);

      // Check if there are any files within range of our folder maw.
      // If so, open the maw and update their status!
      //
      // Folders have a 50px radius around them that sucks files in.
      // NOTE: This isn't dependent on `width` to make the calculations easier.
      // Might change later.
      const folderPoint = getFolderPoint(width);

      const nonEatenFileIdsWithinPerimeter = fileIds.filter((id) => {
        const file = files[id];

        if (file.status === 'being-captured' || file.status === 'captured') {
          return false;
        }

        const distanceBetweenPoints = calculateDistanceBetweenPoints(
          file,
          folderPoint
        );

        return distanceBetweenPoints < FOLDER_GRAVITY_RADIUS;
      });

      nonEatenFileIdsWithinPerimeter.forEach((fileId) =>
        updateFile(fileId, { status: 'being-captured' })
      );
    };

    const moveFilesCloserToTheirDoom = (activeFileIds: Array<string>) => {
      /**
       * Inch all files in the process of being captured closer to the center.
       */
      const folderPoint = getFolderPoint(width);
      const pixelsPerTick = getPixelsPerTick(width);

      const fileIdsBeingCaptured = activeFileIds.filter(
        (id) => files[id].status === 'being-captured'
      );

      fileIdsBeingCaptured.forEach((id) => {
        const file = files[id];
        const deltaX = folderPoint.x - file.x;
        const deltaY = folderPoint.y - file.y;

        // We want to move closer to the folder, by the amount specified by the
        // number of pixels per tick
        // If we have 10 pixels per tick, it means we have 10 pixels to spread
        // between horizontal and vertical directions.
        //
        // eg. In a straight line:
        //
        //   File ------------------------------ Folder
        //        |----|
        //         10px per tick
        //
        // At an angle
        //
        //   File   3px horizontal
        //        \----
        //         \  |
        //          \ |  7px vertical
        //           \|
        //             Folder
        //
        // Important thing is that vertical + horizontal = pixels-per-tick.
        // This way, all files appear to be moving the same speed, regardless
        // of angle of approach.
        const slope = Math.abs(deltaY / deltaX);
        const quadrant = getQuadrantForDeltas(deltaX, deltaY);

        const onTop = quadrant === 1 || quadrant === 2;
        const onLeftSide = quadrant === 1 || quadrant === 3;

        const xMultiplier = onLeftSide ? 1 : -1;
        const yMultiplier = onTop ? 1 : -1;

        const amountToMoveX = (1 - slope) * pixelsPerTick * xMultiplier;
        const amountToMoveY = slope * pixelsPerTick * yMultiplier;

        updateFile(id, {
          x: file.x + amountToMoveX,
          y: file.y + amountToMoveY,
        });
      });
    };

    const swallowFilesAtCenter = (activeFileIds: Array<string>) => {
      /**
       * Update the status for files that have made it to the center of the
       * folder; they have officially been captured.
       */

      const folderPoint = getFolderPoint(width);
      const pixelsPerTick = getPixelsPerTick(width);

      // If any of the files have made it to the very center of the folder,
      // we can remove them from the universe
      const swallowedFileIds = activeFileIds.filter((id) => {
        const file = files[id];

        const distanceToFolder = calculateDistanceBetweenPoints(
          file,
          folderPoint
        );

        return distanceToFolder <= pixelsPerTick;
      });

      swallowedFileIds.forEach((id) => updateFile(id, { status: 'captured' }));
    };

    const moveReleasedFiles = (fileIds: Array<string>) => {
      fileIds.forEach((id) => {
        const file = files[id];

        if (!file.speed) {
          throw new Error('Released file missing `speed` property');
        }

        const nextX = file.x + file.speed.horizontalSpeed;
        const nextY = file.y + file.speed.verticalSpeed;

        // Our x/y coordinates are within the context of the containing element,
        // not the window. We need to "undo" the fact that we made them relative
        // coordinates

        const absoluteX = nextX + (wrapperBoundingBox?.left || 0);
        const absoluteY = nextY + (wrapperBoundingBox?.top || 0);

        // Once the file leaves the window, we want to dispose of it.
        const isFileOutsideWindow = isPointOutsideWindow(
          { x: absoluteX, y: absoluteY },
          file.size
        );

        if (isFileOutsideWindow) {
          deleteFiles([file.id]);
          return;
        }

        updateFile(file.id, {
          x: nextX,
          y: nextY,
        });
      });
    };
    const tick = () => {
      const fileIds = Object.keys(files);

      // We may have a file autonomously flying towards the folder. If so, we
      // need to move it!
      const autonomousFileId = fileIds.find(
        (fileId) => files[fileId].status === 'autonomous'
      );

      if (autonomousFileId) {
        const autnonomousFile = files[autonomousFileId];
        autonomouslyIncrementFile(autnonomousFile);
      }

      // Several methods below need a list of not-captured files.
      const activeFileIds = Object.keys(files).filter(
        (id) => files[id].status !== 'captured'
      );

      handleFolderOpeningAndClosing(activeFileIds);
      startCapturingNearbyFiles();
      moveFilesCloserToTheirDoom(activeFileIds);
      swallowFilesAtCenter(activeFileIds);

      // We may have released files flying in a straight line, from when they
      // were thrown.
      const releasedFileIds = fileIds.filter(
        (fileId) => files[fileId].status === 'released'
      );
      if (releasedFileIds.length > 0) {
        //moveReleasedFiles(releasedFileIds)
      }
      const tickId = window.requestAnimationFrame(tick);
    };

    const toggleRunning = () => {
      if (isRunning) {
        fileGenerationLoop();
        tick();
      }
    };

    toggleRunning();

    return () => {
      window.clearTimeout(generationLoopId);
      /* document.removeEventListener('mousemove', dragFile)
      document.removeEventListener('mouseup', releaseFile)
     
      window.cancelAnimationFrame(tickId) */
    };
  }, [isRunning, files, width]);

  const height = getHeight(width);
  const filesArray = Object.keys(files).map((fileId) => files[fileId]);

  return (
    <Wrapper width={width} ref={wrapperNode}>
      <PlanetContainer size={height}>
        <Earth size={height * 0.4} />
      </PlanetContainer>

      {filesArray.map((file) => (
        <File
          key={file.id}
          size={file.size}
          x={file.x}
          y={file.y}
          id={file.id}
          status={file.status}
          handleMouseDown={() => null} //handleclickfile
        />
      ))}

      <FolderContainer size={height}>
        <Folder isOpen={isFolderOpen} size={height * 0.32} />
      </FolderContainer>
    </Wrapper>
  );
};

export default Installer;
