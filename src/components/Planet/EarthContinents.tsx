import styled from '@emotion/styled';
import Orbit from './Orbit';

interface Props {
  planetSize: number;
}

const EarthContinents: React.FC<Props> = ({ planetSize }) => {
  // In order for our continents to loop properly, we need two copies, set
  // side-by-side. Because the continent SVG is twice the width of our planet,
  // we need to start the first one at -200% width, the second at 0%.
  const STARTING_POINTS = [planetSize * -2, 0];

  return (
    <Wrapper style={{ width: planetSize, height: planetSize }}>
      <Orbit
        planetSize={planetSize}
        duration={29000}
        style={{ width: '100%', height: '100%' }}
      >
        {STARTING_POINTS.map((value, index) => (
          <Landmass
            key={index}
            width={planetSize * 2}
            viewBox="0 0 5063 3071"
            fill="#36e747"
            style={{ top: '-18%', left: value }}
          >
            <defs>
              <linearGradient
                id="continent1"
                x1="746.052"
                y1="633.6"
                x2="746.052"
                y2="1954.77"
                gradientUnits="userSpaceOnUse"
              >
                <stop stopColor="#8EF528" />
                <stop offset="0.464088" stopColor="#8EF528" />
                <stop offset="1" stopColor="#00F17D" />
              </linearGradient>
              <linearGradient
                id="continent2"
                x1="1314.51"
                y1="2003"
                x2="1314.51"
                y2="3069"
                gradientUnits="userSpaceOnUse"
              >
                <stop stopColor="#8EF528" />
                <stop offset="1" stopColor="#00F17D" />
              </linearGradient>
              <linearGradient
                id="continent3"
                x1="1970.01"
                y1="0"
                x2="1970.01"
                y2="1179"
                gradientUnits="userSpaceOnUse"
              >
                <stop offset="0.160221" stopColor="white" />
                <stop offset="0.585635" stopColor="#8EF528" />
                <stop offset="1" stopColor="#00F17D" />
              </linearGradient>
              <linearGradient
                id="continent4"
                x1="2963.51"
                y1="1580"
                x2="2963.51"
                y2="2849"
                gradientUnits="userSpaceOnUse"
              >
                <stop stopColor="#8EF528" />
                <stop offset="1" stopColor="#00F17D" />
              </linearGradient>
              <linearGradient
                id="continent5"
                x1="3838.77"
                y1="284.368"
                x2="3838.77"
                y2="1868.95"
                gradientUnits="userSpaceOnUse"
              >
                <stop offset="0.0718232" stopColor="white" />
                <stop offset="0.403315" stopColor="#8EF528" />
                <stop offset="1" stopColor="#00F17D" />
              </linearGradient>
              <linearGradient
                id="continent6"
                x1="4447.07"
                y1="2234.05"
                x2="4447.07"
                y2="2793.8"
                gradientUnits="userSpaceOnUse"
              >
                <stop stopColor="#8EF528" />
                <stop offset="1" stopColor="#00F17D" />
              </linearGradient>
            </defs>
            <path
              d="M108.509 779C191.597 727.964 263.375 836.882 356.509 808C408.328 791.93 434.675 772.544 476.509 738C597.009 638.5 830.509 564 974.509 738C1039.88 816.989 875.352 923.159 947.509 996C985.68 1034.53 1027.17 1045.82 1080.51 1036C1181.11 1017.47 1073.59 822.719 1170.51 790C1234.52 768.39 1281.22 792.844 1339.51 827C1429.6 879.786 1527.63 964.401 1477.51 1056C1427.39 1147.6 1448.97 1334.06 1385.51 1392.5C1322.05 1450.94 1268.78 1476.05 1186.51 1502C1102.59 1528.47 932.28 1502.99 867.009 1562C830.509 1595 819.449 1618.4 845.009 1679C865.929 1728.59 981.437 1907.21 947.509 1949C913.557 1990.82 747.37 1792.38 697.509 1772C597.442 1731.1 568.024 1654.15 511.509 1562C462.237 1481.66 505.497 1411.91 471.509 1324C423.03 1198.61 386.836 1097.98 260.509 1052C179.409 1022.48 102.328 1111.18 39.5093 1052C-40.5309 976.594 14.8083 836.555 108.509 779Z"
              fill="url(#continent1)"
            />
            <path
              d="M971.155 2266.46C944.866 2184.31 942.462 2109.89 1002.33 2047.8C1062.01 1985.91 1132.99 2005.12 1218.9 2008.31C1412.9 2015.51 1545.88 2098.79 1643.73 2266.46C1821.91 2571.77 1192.71 3051.3 1192.71 3051.3C1192.71 3051.3 1112.07 3116.57 1112.07 2996.43C1112.07 2876.29 1262.11 2620.51 1145.74 2433.57C1095.86 2353.45 999.922 2356.35 971.155 2266.46Z"
              fill="url(#continent2)"
            />
            <path
              d="M1785.89 752.623C1717.72 636.874 1591.97 638.001 1549.77 509.04C1496.7 346.901 1604.99 132.332 1658.17 84.8386C1711.36 37.3454 1915.37 -30.0577 2074.52 14.6781C2177.43 43.6045 2287.27 104.987 2342.49 172.629C2397.71 240.271 2448.8 534.069 2342.49 709.807C2284.51 805.649 2162.55 804.434 2112.8 878.912C2045.85 979.155 2050.31 1181.1 1934.61 1178.98C1877.83 1177.95 1843.06 1140.06 1800.46 1100.19C1699.28 1005.49 1857.41 874.05 1785.89 752.623Z"
              fill="url(#continent3)"
            />
            <path
              d="M2417.61 1893.79C2464.77 1746.49 2550.33 1666.31 2694.7 1610.75C2793.34 1572.8 2859.69 1575.61 2964.49 1589.28C3062.45 1602.05 3107.53 1649.72 3204.21 1670.02C3310.59 1692.37 3329.03 1664.02 3419.86 1723.71C3531.38 1796.99 3526.94 1865.63 3538 1998.59C3547.9 2117.61 3544.4 2201.38 3497.62 2311.27C3456.79 2407.18 3435.76 2545.35 3435.76 2545.35C3435.76 2545.35 3402.31 2727.76 3317.19 2790.59C3248 2841.67 3164.13 2876.33 3098.96 2820.23C3062.25 2788.64 3063.27 2753.16 3047.83 2707.27C3005.85 2582.48 3131.19 2312.69 2937.43 2265.31C2832.09 2239.56 2734.56 2305.13 2627.69 2286.79C2533.85 2270.68 2467.2 2244.35 2417.61 2163.09C2362.84 2073.31 2385.55 1993.95 2417.61 1893.79Z"
              fill="url(#continent4)"
            />
            <path
              d="M2930.5 1524.5C2765.38 1486 2698.95 1615.48 2629.01 1461.03C2598.2 1392.99 2619.01 1336.5 2704.51 1298.82C2837.31 1240.29 2930.82 1122.84 2897.91 981.491C2886.36 931.906 2848.7 915.464 2838.05 865.68C2803.8 705.665 2981.99 522.475 3137.71 572.788C3194.33 591.084 3203.85 643.839 3259.91 663.808C3430.4 724.546 3431.53 420.957 3595.34 344C3815.19 240.719 3935.16 413.851 4172.51 465.5C4446.27 525.072 4895 545 4959.5 762.5C4995.07 882.431 4803.45 855.553 4722 950.5C4579.42 1116.71 4690.72 1217.73 4608.01 1420.5C4573.61 1504.82 4319.01 1516.19 4257.36 1583.21C4208.22 1636.63 4217.9 1637.79 4172.51 1694.42C4132.05 1744.9 4199.09 1830.75 4143.01 1863C4066.64 1906.91 3948.02 1693.33 3859.94 1694.42C3762.33 1695.63 3786 1777 3638 1777C3490 1777 3536.09 1613.5 3301.5 1613.5C3066.91 1613.5 3073.79 1557.91 2930.5 1524.5Z"
              fill="url(#continent5)"
            />
            <path
              d="M4103.51 2469.5C4148.3 2385.37 4227.46 2386.88 4311.01 2341C4388.32 2298.55 4433.24 2206.56 4514.01 2242C4560.44 2262.37 4547.73 2334.44 4598.01 2341C4655.03 2348.44 4652.07 2258.98 4707.01 2242C4836.64 2201.94 4842.89 2441.62 4811.01 2573.5C4785.73 2678.09 4748.01 2770.37 4642.51 2791.5C4542.5 2811.53 4509.57 2694.66 4410.01 2672.5C4292.78 2646.41 4177.74 2791.9 4103.51 2697.5C4048.47 2627.51 4061.67 2548.1 4103.51 2469.5Z"
              fill="url(#continent6)"
            />
          </Landmass>
        ))}
      </Orbit>
    </Wrapper>
  );
};

const Wrapper = styled.div`
  position: absolute;
  top: 0;
  left: 0;
`;

const Landmass = styled.svg<{ width: number }>`
  position: absolute;
  width: ${(props) => props.width}px;
`;

export default EarthContinents;
