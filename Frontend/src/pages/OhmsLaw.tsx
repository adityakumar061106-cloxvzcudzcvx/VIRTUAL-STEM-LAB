import { useState } from "react";
import Sidebar from "../components/Sidebar";
import OhmLawScene from "../components/OhmLawScene";
import { calculateOhmsLaw } from "../api";

interface Reading {
  id: number;
  voltage: number;
  resistance: number;
  current: number;
}

function OhmsLaw() {
  const [voltage, setVoltage] = useState(10);
  const [resistance, setResistance] = useState(5);
  const [isRunning, setIsRunning] = useState(false);
  const [switchOn, setSwitchOn] = useState(false);
  const [readings, setReadings] = useState<Reading[]>([]);

  const current = voltage / resistance;

  /*
   * Run Experiment
   *
   * Creates a complete voltage-current observation set
   * using the currently selected resistance.
   */
const runExperiment = async () => {
  setSwitchOn(true);
  setIsRunning(true);

  const experimentVoltages = [2, 5, 10, 15, 20];

  try {
    const newReadings = await Promise.all(
      experimentVoltages.map(async (v, index) => {
        const result = await calculateOhmsLaw(
          v,
          resistance
        );

        return {
          id: Date.now() + index,
          voltage: result.voltage,
          resistance: result.resistance,
          current: result.current,
        };
      })
    );

    setReadings(newReadings);
  } catch (error) {
    console.error(
      "Ohm's Law experiment failed:",
      error
    );

    setIsRunning(false);
    setSwitchOn(false);
  }
};

  /*
   * Add current live reading manually.
   */
  const addReading = () => {
    setIsRunning(true);

    const newReading: Reading = {
      id: Date.now(),
      voltage,
      resistance,
      current,
    };

    setReadings((previous) => [
      ...previous,
      newReading,
    ]);
  };

  /*
   * Delete one observation.
   */
  const deleteReading = (id: number) => {
    setReadings((previous) =>
      previous.filter(
        (reading) => reading.id !== id
      )
    );
  };

  /*
   * Reset complete experiment.
   */
  const handleReset = () => {
  setVoltage(10);
  setResistance(5);
  setIsRunning(false);
  setSwitchOn(false);
  setReadings([]);
};
  /*
   * Graph configuration
   */
  const graphWidth = 620;
  const graphHeight = 300;

  const graphLeft = 65;
  const graphRight = 590;
  const graphTop = 25;
  const graphBottom = 235;

  const maxCurrent =
    readings.length > 0
      ? Math.max(
          1,
          ...readings.map(
            (reading) => reading.current
          )
        )
      : 4;

  const getGraphX = (value: number) => {
    return (
      graphLeft +
      ((value - 1) / 19) *
        (graphRight - graphLeft)
    );
  };

  const getGraphY = (value: number) => {
    return (
      graphBottom -
      (value / maxCurrent) *
        (graphBottom - graphTop)
    );
  };

  return (
    <div className="min-h-screen bg-[#020617] text-white flex">
      <Sidebar />

      <main className="flex-1 overflow-y-auto">
        {/* =====================================================
            HEADER
        ====================================================== */}

        <section className="relative overflow-hidden border-b border-slate-800">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_20%,rgba(37,99,235,0.18),transparent_35%),radial-gradient(circle_at_80%_10%,rgba(14,165,233,0.12),transparent_30%)]" />

          <div className="relative p-8">
            <div className="flex flex-col xl:flex-row xl:items-end xl:justify-between gap-5">
              <div>
                <div className="flex items-center gap-2 text-sm text-slate-500 mb-3">
                  <span>Experiments</span>
                  <span>›</span>
                  <span className="text-blue-400">
                    Physics
                  </span>
                  <span>›</span>
                  <span className="text-slate-300">
                    Ohm's Law
                  </span>
                </div>

                <p className="text-blue-400 text-sm font-semibold uppercase tracking-wider">
                  Virtual Physics Laboratory
                </p>

                <h1 className="text-4xl font-bold mt-2">
                  Ohm's Law Experiment
                </h1>

                <p className="text-slate-400 mt-3 max-w-3xl">
                  Explore the relationship between voltage,
                  current and resistance using an interactive
                  3D laboratory.
                </p>
              </div>

              <button
                onClick={() => window.history.back()}
                className="border border-slate-700 bg-slate-900/80 hover:bg-slate-800 px-5 py-3 rounded-xl transition"
              >
                ← Back to Experiments
              </button>
            </div>
          </div>
        </section>

        <div className="p-8 space-y-6">

          {/* =====================================================
              3D LAB + EXPERIMENT INFO
          ====================================================== */}

          <section className="grid grid-cols-1 2xl:grid-cols-[minmax(0,1fr)_360px] gap-6">

            {/* 3D LAB */}
            <div>
              <div className="bg-slate-900/80 border border-slate-800 rounded-2xl p-5">

                <div className="flex items-center justify-between mb-4">
                  <div>
                    <h2 className="text-xl font-semibold">
                      3D Virtual Laboratory
                    </h2>

                    <p className="text-sm text-slate-500 mt-1">
                      Drag to rotate • Scroll to zoom
                    </p>
                  </div>

                  <span
                    className={`px-3 py-1.5 rounded-full text-xs font-semibold ${
                      isRunning
                        ? "bg-emerald-500/10 text-emerald-400 border border-emerald-500/20"
                        : "bg-slate-800 text-slate-400 border border-slate-700"
                    }`}
                  >
                    {isRunning
                      ? "● CIRCUIT ON"
                      : "● CIRCUIT OFF"}
                  </span>
                </div>

                <OhmLawScene
                  voltage={voltage}
                  resistance={resistance}
                  isRunning={isRunning}
                  switchOn={switchOn}
                  onSwitchToggle={() => {
                    const nextState = !switchOn;
                
                    setSwitchOn(nextState);
                    setIsRunning(nextState);
                  }}
                />

              </div>
            </div>

            {/* EXPERIMENT INFO */}
            <aside className="bg-slate-900/90 border border-slate-800 rounded-2xl p-6">

              <div className="flex items-center gap-3 mb-5">

                <div className="w-10 h-10 rounded-xl bg-blue-500/10 border border-blue-500/20 flex items-center justify-center text-xl">
                  ℹ️
                </div>

                <div>
                  <h2 className="text-xl font-semibold">
                    Experiment Info
                  </h2>

                  <p className="text-xs text-slate-500">
                    Ohm's Law
                  </p>
                </div>

              </div>

              <p className="text-sm text-slate-400 leading-6">
                This experiment investigates the relationship
                between voltage, current and resistance.
              </p>

              {/* Formula */}
              <div className="mt-6 rounded-xl border border-slate-700 bg-slate-950 p-5 text-center">

                <div className="text-3xl font-bold text-blue-400">
                  V = I × R
                </div>

                <div className="text-xl font-semibold mt-4">
                  I = V / R
                </div>

              </div>

              {/* Variables */}
              <div className="mt-5 space-y-4 text-sm">

                <div className="flex gap-3">
                  <span className="text-blue-400 font-bold">
                    V
                  </span>

                  <span className="text-slate-400">
                    Voltage — measured in volts (V)
                  </span>
                </div>

                <div className="flex gap-3">
                  <span className="text-cyan-400 font-bold">
                    I
                  </span>

                  <span className="text-slate-400">
                    Current — measured in amperes (A)
                  </span>
                </div>

                <div className="flex gap-3">
                  <span className="text-orange-400 font-bold">
                    R
                  </span>

                  <span className="text-slate-400">
                    Resistance — measured in ohms (Ω)
                  </span>
                </div>

              </div>

              {/* Learning Tip */}
              <div className="mt-6 p-4 rounded-xl bg-blue-500/5 border border-blue-500/20">

                <p className="text-sm text-blue-300 font-medium">
                  💡 Learning Tip
                </p>

                <p className="text-xs text-slate-400 mt-2 leading-5">
                  Keep resistance constant and increase
                  voltage. The current should increase
                  proportionally.
                </p>

              </div>

            </aside>

          </section>

          {/* =====================================================
              CONTROLS + LIVE READINGS
          ====================================================== */}

          <section className="grid grid-cols-1 xl:grid-cols-2 gap-6">

            {/* CONTROLS */}
            <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6">

              <div className="flex items-center justify-between mb-6">

                <div>
                  <h2 className="text-xl font-semibold">
                    Adjust Parameters
                  </h2>

                  <p className="text-sm text-slate-500 mt-1">
                    Configure your experiment
                  </p>
                </div>

                <span className="text-2xl">
                  ⚙️
                </span>

              </div>

              {/* VOLTAGE */}
              <div className="mb-8">

                <div className="flex justify-between mb-3">

                  <label className="font-medium">
                    ⚡ Voltage (V)
                  </label>

                  <span className="text-yellow-400 font-bold">
                    {voltage.toFixed(1)} V
                  </span>

                </div>

                <input
                  type="range"
                  min="1"
                  max="20"
                  step="0.5"
                  value={voltage}
                  onChange={(e) =>
                    setVoltage(
                      Number(e.target.value)
                    )
                  }
                  className="w-full accent-blue-500"
                />

                <div className="flex justify-between text-xs text-slate-600 mt-2">
                  <span>1 V</span>
                  <span>20 V</span>
                </div>

              </div>

              {/* RESISTANCE */}
              <div className="mb-8">

                <div className="flex justify-between mb-3">

                  <label className="font-medium">
                    🔧 Resistance (Ω)
                  </label>

                  <span className="text-orange-400 font-bold">
                    {resistance.toFixed(1)} Ω
                  </span>

                </div>

                <input
                  type="range"
                  min="1"
                  max="20"
                  step="0.5"
                  value={resistance}
                  onChange={(e) =>
                    setResistance(
                      Number(e.target.value)
                    )
                  }
                  className="w-full accent-orange-500"
                />

                <div className="flex justify-between text-xs text-slate-600 mt-2">
                  <span>1 Ω</span>
                  <span>20 Ω</span>
                </div>

              </div>

              {/* BUTTONS */}
              <div className="flex gap-3">

                <button
                  onClick={runExperiment}
                  className="flex-1 bg-blue-600 hover:bg-blue-500 px-5 py-3 rounded-xl font-semibold transition shadow-lg shadow-blue-600/20"
                >
                  ▶ Run Experiment
                </button>

                <button
                  onClick={handleReset}
                  className="px-5 py-3 rounded-xl bg-slate-800 hover:bg-slate-700 border border-slate-700 font-medium transition"
                >
                  ↻ Reset
                </button>

              </div>

            </div>

            {/* LIVE READINGS */}
            <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6">

              <div className="flex items-center justify-between mb-6">

                <div>
                  <h2 className="text-xl font-semibold">
                    Live Readings
                  </h2>

                  <p className="text-sm text-slate-500 mt-1">
                    Current circuit measurements
                  </p>
                </div>

                <div
                  className={`w-3 h-3 rounded-full ${
                    isRunning
                      ? "bg-emerald-400 animate-pulse"
                      : "bg-slate-600"
                  }`}
                />

              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">

                {/* Voltage */}
                <div className="rounded-xl bg-slate-950 border border-slate-800 p-5">

                  <p className="text-xs text-slate-500">
                    Voltage
                  </p>

                  <p className="text-2xl font-bold text-yellow-400 mt-2">
                    {voltage.toFixed(1)} V
                  </p>

                </div>

                {/* Resistance */}
                <div className="rounded-xl bg-slate-950 border border-slate-800 p-5">

                  <p className="text-xs text-slate-500">
                    Resistance
                  </p>

                  <p className="text-2xl font-bold text-orange-400 mt-2">
                    {resistance.toFixed(1)} Ω
                  </p>

                </div>

                {/* Current */}
                <div className="rounded-xl bg-slate-950 border border-slate-800 p-5">

                  <p className="text-xs text-slate-500">
                    Current
                  </p>

                  <p className="text-2xl font-bold text-cyan-400 mt-2">
                    {current.toFixed(2)} A
                  </p>

                </div>

              </div>

              {/* STATUS */}
              <div className="mt-5 rounded-xl bg-slate-950 border border-slate-800 p-5">

                <p className="text-xs text-slate-500">
                  Circuit Status
                </p>

                <p
                  className={`text-lg font-semibold mt-2 ${
                    isRunning
                      ? "text-emerald-400"
                      : "text-slate-400"
                  }`}
                >
                  {isRunning
                    ? "● Circuit is ON"
                    : "○ Circuit is OFF"}
                </p>

                <p className="text-sm text-slate-500 mt-1">
                  {isRunning
                    ? `${readings.length} observations recorded.`
                    : "Press Run Experiment to start measurements."}
                </p>

              </div>

            </div>

          </section>

          {/* =====================================================
              GRAPH + OBSERVATION TABLE
          ====================================================== */}

          <section className="grid grid-cols-1 2xl:grid-cols-[1fr_1fr] gap-6">

            {/* =================================================
                V-I GRAPH
            ================================================== */}

            <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6">

              <div className="flex items-center justify-between mb-5">

                <div>
                  <h2 className="text-xl font-semibold">
                    V-I Graph
                  </h2>

                  <p className="text-sm text-slate-500 mt-1">
                    Voltage vs Current relationship
                  </p>
                </div>

                <span className="text-xl">
                  📈
                </span>

              </div>

              {readings.length === 0 ? (

                <div className="h-[330px] flex items-center justify-center rounded-xl bg-slate-950 border border-slate-800">

                  <div className="text-center">

                    <div className="text-5xl mb-4">
                      📊
                    </div>

                    <p className="text-slate-400">
                      Run the experiment to generate the graph
                    </p>

                    <p className="text-xs text-slate-600 mt-2">
                      Experimental voltage-current data will appear here.
                    </p>

                  </div>

                </div>

              ) : (

                <div className="rounded-xl bg-slate-950 border border-slate-800 p-3 overflow-x-auto">

                  <svg
                    viewBox={`0 0 ${graphWidth} ${graphHeight}`}
                    className="w-full min-w-[560px]"
                  >

                    {/* GRID HORIZONTAL */}
                    {[0, 1, 2, 3, 4].map(
                      (index) => {
                        const y =
                          graphTop +
                          ((graphBottom - graphTop) /
                            4) *
                            index;

                        return (
                          <line
                            key={`h-${index}`}
                            x1={graphLeft}
                            y1={y}
                            x2={graphRight}
                            y2={y}
                            stroke="#1e293b"
                            strokeWidth="1"
                          />
                        );
                      }
                    )}

                    {/* GRID VERTICAL */}
                    {[1, 5, 10, 15, 20].map(
                      (value) => {

                        const x =
                          getGraphX(value);

                        return (
                          <line
                            key={`v-${value}`}
                            x1={x}
                            y1={graphTop}
                            x2={x}
                            y2={graphBottom}
                            stroke="#1e293b"
                            strokeWidth="1"
                          />
                        );
                      }
                    )}

                    {/* AXES */}
                    <line
                      x1={graphLeft}
                      y1={graphTop}
                      x2={graphLeft}
                      y2={graphBottom}
                      stroke="#64748b"
                      strokeWidth="2"
                    />

                    <line
                      x1={graphLeft}
                      y1={graphBottom}
                      x2={graphRight}
                      y2={graphBottom}
                      stroke="#64748b"
                      strokeWidth="2"
                    />

                    {/* X LABELS */}
                    {[1, 5, 10, 15, 20].map(
                      (value) => {

                        const x =
                          getGraphX(value);

                        return (
                          <text
                            key={value}
                            x={x}
                            y={graphBottom + 25}
                            textAnchor="middle"
                            fill="#64748b"
                            fontSize="12"
                          >
                            {value}
                          </text>
                        );
                      }
                    )}

                    {/* Y LABELS */}
                    {[0, 1, 2, 3, 4].map(
                      (value) => {

                        const y =
                          graphBottom -
                          (value / 4) *
                            (graphBottom -
                              graphTop);

                        const labelValue =
                          (value / 4) *
                          maxCurrent;

                        return (
                          <text
                            key={value}
                            x={graphLeft - 12}
                            y={y + 4}
                            textAnchor="end"
                            fill="#64748b"
                            fontSize="11"
                          >
                            {labelValue.toFixed(1)}
                          </text>
                        );
                      }
                    )}

                    {/* X AXIS TITLE */}
                    <text
                      x={
                        (graphLeft +
                          graphRight) /
                        2
                      }
                      y={graphHeight - 5}
                      textAnchor="middle"
                      fill="#94a3b8"
                      fontSize="13"
                    >
                      Voltage (V)
                    </text>

                    {/* Y AXIS TITLE */}
                    <text
                      x="16"
                      y={
                        (graphTop +
                          graphBottom) /
                        2
                      }
                      textAnchor="middle"
                      fill="#94a3b8"
                      fontSize="13"
                      transform={`rotate(-90 16 ${
                        (graphTop +
                          graphBottom) /
                        2
                      })`}
                    >
                      Current (A)
                    </text>

                    {/* LINE */}
                    {readings.length > 1 && (
                      <polyline
                        fill="none"
                        stroke="#38bdf8"
                        strokeWidth="3"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        points={readings
                          .map(
                            (reading) =>
                              `${getGraphX(
                                reading.voltage
                              )},${getGraphY(
                                reading.current
                              )}`
                          )
                          .join(" ")}
                      />
                    )}

                    {/* DATA POINTS */}
                    {readings.map(
                      (reading) => {

                        const x =
                          getGraphX(
                            reading.voltage
                          );

                        const y =
                          getGraphY(
                            reading.current
                          );

                        const isSelected =
                          Math.abs(
                            reading.voltage -
                              voltage
                          ) < 0.01;

                        return (
                          <g key={reading.id}>

                            {/* Glow */}
                            {isSelected && (
                              <circle
                                cx={x}
                                cy={y}
                                r="12"
                                fill="#38bdf8"
                                opacity="0.15"
                              />
                            )}

                            {/* Point */}
                            <circle
                              cx={x}
                              cy={y}
                              r={
                                isSelected
                                  ? 7
                                  : 5
                              }
                              fill={
                                isSelected
                                  ? "#facc15"
                                  : "#38bdf8"
                              }
                            />

                          </g>
                        );
                      }
                    )}

                  </svg>

                </div>
              )}

              {/* Graph explanation */}
              {readings.length > 0 && (
                <div className="mt-4 p-4 rounded-xl bg-blue-500/5 border border-blue-500/10">

                  <p className="text-xs text-slate-400">
                    <span className="text-blue-400 font-semibold">
                      Graph interpretation:
                    </span>{" "}
                    The straight-line relationship shows that
                    current increases proportionally with voltage
                    when resistance remains constant.
                  </p>

                </div>
              )}

            </div>

            {/* =================================================
                OBSERVATION TABLE
            ================================================== */}

            <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6">

              <div className="flex items-center justify-between mb-5">

                <div>
                  <h2 className="text-xl font-semibold">
                    Observation Table
                  </h2>

                  <p className="text-sm text-slate-500 mt-1">
                    Experimental measurements
                  </p>
                </div>

                <button
                  onClick={addReading}
                  className="bg-blue-600 hover:bg-blue-500 px-4 py-2 rounded-lg text-sm font-semibold transition"
                >
                  + Add Reading
                </button>

              </div>

              {readings.length === 0 ? (

                <div className="h-[270px] flex items-center justify-center rounded-xl bg-slate-950 border border-slate-800">

                  <div className="text-center">

                    <div className="text-5xl mb-4">
                      📝
                    </div>

                    <p className="text-slate-400">
                      No observations recorded
                    </p>

                    <p className="text-xs text-slate-600 mt-2">
                      Click "Run Experiment" to automatically
                      collect observations.
                    </p>

                  </div>

                </div>

              ) : (

                <div className="overflow-x-auto rounded-xl border border-slate-800">

                  <table className="w-full text-sm">

                    <thead className="bg-slate-950">

                      <tr className="text-left text-slate-400">

                        <th className="px-4 py-3">
                          #
                        </th>

                        <th className="px-4 py-3">
                          Voltage (V)
                        </th>

                        <th className="px-4 py-3">
                          Resistance (Ω)
                        </th>

                        <th className="px-4 py-3">
                          Current (A)
                        </th>

                        <th className="px-4 py-3 text-right">
                          Action
                        </th>

                      </tr>

                    </thead>

                    <tbody>

                      {readings.map(
                        (reading, index) => {

                          const isSelected =
                            Math.abs(
                              reading.voltage -
                                voltage
                            ) < 0.01;

                          return (
                            <tr
                              key={reading.id}
                              className={`border-t border-slate-800 transition ${
                                isSelected
                                  ? "bg-blue-500/5"
                                  : "hover:bg-slate-800/40"
                              }`}
                            >

                              <td className="px-4 py-3 text-slate-500">
                                {index + 1}
                              </td>

                              <td className="px-4 py-3 text-yellow-400 font-semibold">
                                {reading.voltage.toFixed(
                                  1
                                )} V
                              </td>

                              <td className="px-4 py-3 text-orange-400 font-semibold">
                                {reading.resistance.toFixed(
                                  1
                                )} Ω
                              </td>

                              <td className="px-4 py-3 text-cyan-400 font-bold">
                                {reading.current.toFixed(
                                  2
                                )} A
                              </td>

                              <td className="px-4 py-3 text-right">

                                <button
                                  onClick={() =>
                                    deleteReading(
                                      reading.id
                                    )
                                  }
                                  className="text-red-400 hover:text-red-300 transition"
                                  title="Delete reading"
                                >
                                  🗑️
                                </button>

                              </td>

                            </tr>
                          );
                        }
                      )}

                    </tbody>

                  </table>

                </div>
              )}

              {/* Table summary */}
              {readings.length > 0 && (
                <div className="mt-4 flex items-center justify-between text-xs">

                  <span className="text-slate-500">
                    {readings.length} observations recorded
                  </span>

                  <span className="text-emerald-400">
                    ✓ Experiment data generated
                  </span>

                </div>
              )}

            </div>

          </section>

          {/* =====================================================
              EXPERIMENT OBSERVATION
          ====================================================== */}

          <section className="bg-gradient-to-r from-cyan-500/10 to-blue-500/10 border border-cyan-500/20 rounded-2xl p-6">

            <div className="flex gap-4">

              <div className="text-3xl">
                💡
              </div>

              <div className="flex-1">

                <h2 className="text-lg font-semibold text-cyan-300">
                  Experiment Observation
                </h2>

                {readings.length === 0 ? (

                  <p className="text-sm text-slate-400 mt-2 leading-6">
                    Run the experiment to generate observations
                    and analyze the voltage-current relationship.
                  </p>

                ) : (

                  <>
                    <p className="text-sm text-slate-400 mt-2 leading-6">
                      The experiment was performed with a
                      resistance of{" "}
                      <span className="text-orange-400 font-semibold">
                        {resistance.toFixed(1)} Ω
                      </span>
                      . As voltage was increased from{" "}
                      <span className="text-yellow-400 font-semibold">
                        {Math.min(
                          ...readings.map(
                            (r) => r.voltage
                          )
                        ).toFixed(1)} V
                      </span>{" "}
                      to{" "}
                      <span className="text-yellow-400 font-semibold">
                        {Math.max(
                          ...readings.map(
                            (r) => r.voltage
                          )
                        ).toFixed(1)} V
                      </span>
                      , the current increased proportionally.
                    </p>

                    <div className="mt-4 grid grid-cols-1 md:grid-cols-3 gap-4">

                      <div className="bg-slate-950/60 border border-slate-800 rounded-xl p-4">
                        <p className="text-xs text-slate-500">
                          Starting Current
                        </p>

                        <p className="text-xl font-bold text-cyan-400 mt-1">
                          {readings[0].current.toFixed(
                            2
                          )} A
                        </p>
                      </div>

                      <div className="bg-slate-950/60 border border-slate-800 rounded-xl p-4">
                        <p className="text-xs text-slate-500">
                          Final Current
                        </p>

                        <p className="text-xl font-bold text-cyan-400 mt-1">
                          {readings[
                            readings.length - 1
                          ].current.toFixed(2)}{" "}
                          A
                        </p>
                      </div>

                      <div className="bg-slate-950/60 border border-slate-800 rounded-xl p-4">
                        <p className="text-xs text-slate-500">
                          Relationship
                        </p>

                        <p className="text-xl font-bold text-emerald-400 mt-1">
                          V ∝ I
                        </p>
                      </div>

                    </div>
                  </>

                )}

              </div>

            </div>

          </section>

        </div>
      </main>
    </div>
  );
}

export default OhmsLaw; 