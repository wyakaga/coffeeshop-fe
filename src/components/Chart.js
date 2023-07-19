/* eslint-disable react/prop-types */
import React from "react";
import {
  VictoryChart,
  VictoryBar,
  VictoryAxis,
  VictoryTooltip,
  VictoryLegend,
} from "victory";

function Chart({ reportData, sortBy }) {
  const legendData = [{ name: "Income", symbol: { fill: "#FFBA33" } }];

  const formatTickLabel = (value) => {
    if (value >= 1000000000) {
      return `${value / 1000000000}B`;
    }
    if (value >= 1000000) {
      return `${value / 1000000}M`;
    }
    if (value >= 1000) {
      return `${value / 1000}K`;
    }
    return value;
  };

  const setXAxis = (sortBy) => {
    if (sortBy === "day") {
      return "day";
    }
    if (sortBy === "week") {
      return "week";
    }
    if (
      sortBy === "month" ||
      (sortBy !== "day" && sortBy !== "week" && sortBy !== "month") ||
      !sortBy
    ) {
      return "month";
    }
  };

  const setYAxis = (sortBy) => {
    if (sortBy === "day") {
      return "daily_total";
    }
    if (sortBy === "week") {
      return "weekly_total";
    }
    if (
      sortBy === "month" ||
      (sortBy !== "day" && sortBy !== "week" && sortBy !== "month") ||
      !sortBy
    ) {
      return "monthly_total";
    }
  };

  const setXLabels = (datum, sortBy) => {
    if (sortBy === "day") {
      return datum.day;
    }
    if (sortBy === "week") {
      return datum.week;
    }
    if (
      sortBy === "month" ||
      (sortBy !== "day" && sortBy !== "week" && sortBy !== "month") ||
      !sortBy
    ) {
      return datum.month;
    }
  };

  const setYLabels = (datum, sortBy) => {
    if (sortBy === "day") {
      return datum.daily_total;
    }
    if (sortBy === "week") {
      return datum.weekly_total;
    }
    if (
      sortBy === "month" ||
      (sortBy !== "day" && sortBy !== "week" && sortBy !== "month") ||
      !sortBy
    ) {
      return datum.monthly_total;
    }
  };

  return (
    <VictoryChart domainPadding={20}>
      <VictoryAxis
        dependentAxis
        tickFormat={formatTickLabel}
        style={{
          axis: { stroke: "black" },
          ticks: { stroke: "black" },
          tickLabels: { fill: "black", fontSize: 8, fontFamily: "Poppins" },
        }}
      />
      <VictoryAxis
        style={{
          axis: { stroke: "black" },
          ticks: { stroke: "black" },
          tickLabels: { fill: "black", fontSize: 8, fontFamily: "Poppins" },
        }}
      />
      <VictoryLegend
        data={legendData}
        orientation="horizontal"
        x={50}
        y={30}
        style={{ labels: { fontSize: 8, fontFamily: "Poppins" } }}
      />
      <VictoryBar
        data={reportData}
        x={setXAxis(sortBy)}
        y={setYAxis(sortBy)}
        labelComponent={
          <VictoryTooltip
            style={{ fill: "black", fontSize: 8, fontFamily: "Poppins" }}
            flyoutStyle={{ stroke: "transparent", fill: "#FFBA33" }}
          />
        }
        labels={({ datum }) =>
          `${setXLabels(datum, sortBy)}: IDR ${Number(
            setYLabels(datum, sortBy)
          ).toLocaleString("id-ID")}`
        }
        style={{
          data: { fill: "#FFBA33" },
        }}
      />
    </VictoryChart>
  );
}

export default Chart;
