import { useMemo, useRef } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import {
  ContactShadows,
  Environment,
  OrbitControls,
  RoundedBox,
} from "@react-three/drei";
import * as THREE from "three";

interface OhmLawSceneProps {
  voltage: number;
  resistance: number;
  isRunning: boolean;
  switchOn: boolean;
  onSwitchToggle: () => void;
}

function Wire({
  points,
  color,
  active,
}: {
  points: [number, number, number][];
  color: string;
  active: boolean;
}) {
  const curve = useMemo(
    () =>
      new THREE.CatmullRomCurve3(
        points.map(
          (point) =>
            new THREE.Vector3(point[0], point[1], point[2])
        )
      ),
    [points]
  );

  return (
    <mesh>
      <tubeGeometry args={[curve, 64, 0.055, 16, false]} />

      <meshStandardMaterial
        color={color}
        metalness={0.7}
        roughness={0.2}
        emissive={active ? color : "#000000"}
        emissiveIntensity={active ? 0.8 : 0}
      />
    </mesh>
  );
}

function PowerSupply({
  voltage,
}: {
  voltage: number;
}) {
  return (
    <group position={[-4.7, 0.35, 0]}>
      {/* Main body */}
      <RoundedBox
        args={[2.8, 1.7, 1.8]}
        radius={0.12}
        smoothness={5}
        castShadow
      >
        <meshStandardMaterial
          color="#263244"
          metalness={0.85}
          roughness={0.22}
        />
      </RoundedBox>

      {/* Top highlight */}
      <RoundedBox
        args={[2.45, 0.08, 1.45]}
        radius={0.03}
        smoothness={3}
        position={[0, 0.88, 0]}
      >
        <meshStandardMaterial
          color="#3b82f6"
          emissive="#1d4ed8"
          emissiveIntensity={0.35}
        />
      </RoundedBox>

      {/* Front panel */}
      <RoundedBox
        args={[2.35, 1.2, 0.08]}
        radius={0.04}
        smoothness={4}
        position={[0, 0, 0.94]}
      >
        <meshStandardMaterial
          color="#0b1220"
          metalness={0.3}
          roughness={0.35}
        />
      </RoundedBox>

      {/* Display */}
      <RoundedBox
        args={[1.3, 0.42, 0.07]}
        radius={0.03}
        smoothness={3}
        position={[-0.35, 0.35, 1]}
      >
        <meshStandardMaterial
          color="#020617"
          emissive="#ef4444"
          emissiveIntensity={0.25}
        />
      </RoundedBox>

      {/* Digital display bars */}
      <group position={[-0.65, 0.35, 1.05]}>
        {[0, 0.22, 0.44].map((x, index) => (
          <group key={index} position={[x, 0, 0]}>
            <mesh position={[0, 0.12, 0]}>
              <boxGeometry args={[0.1, 0.025, 0.025]} />
              <meshStandardMaterial
                color="#ef4444"
                emissive="#ef4444"
                emissiveIntensity={2}
              />
            </mesh>

            <mesh position={[0, -0.12, 0]}>
              <boxGeometry args={[0.1, 0.025, 0.025]} />
              <meshStandardMaterial
                color="#ef4444"
                emissive="#ef4444"
                emissiveIntensity={2}
              />
            </mesh>

            <mesh position={[-0.055, 0, 0]}>
              <boxGeometry args={[0.025, 0.22, 0.025]} />
              <meshStandardMaterial
                color="#ef4444"
                emissive="#ef4444"
                emissiveIntensity={2}
              />
            </mesh>

            <mesh position={[0.055, 0, 0]}>
              <boxGeometry args={[0.025, 0.22, 0.025]} />
              <meshStandardMaterial
                color="#ef4444"
                emissive="#ef4444"
                emissiveIntensity={2}
              />
            </mesh>
          </group>
        ))}
      </group>

      {/* Knob */}
      <mesh
        position={[0.82, -0.18, 1.02]}
        rotation={[Math.PI / 2, 0, 0]}
        castShadow
      >
        <cylinderGeometry args={[0.3, 0.3, 0.15, 40]} />

        <meshStandardMaterial
          color="#64748b"
          metalness={0.95}
          roughness={0.18}
        />
      </mesh>

      {/* Knob indicator */}
      <mesh
        position={[0.82, -0.18, 1.11]}
        rotation={[Math.PI / 2, 0, 0]}
      >
        <boxGeometry args={[0.035, 0.18, 0.03]} />

        <meshStandardMaterial color="#e2e8f0" />
      </mesh>

      {/* Positive terminal */}
      <mesh
        position={[0.65, -0.58, 1.02]}
        castShadow
      >
        <cylinderGeometry args={[0.14, 0.14, 0.18, 32]} />

        <meshStandardMaterial
          color="#dc2626"
          metalness={0.9}
          roughness={0.18}
        />
      </mesh>

      {/* Negative terminal */}
      <mesh
        position={[-0.65, -0.58, 1.02]}
        castShadow
      >
        <cylinderGeometry args={[0.14, 0.14, 0.18, 32]} />

        <meshStandardMaterial
          color="#111827"
          metalness={0.9}
          roughness={0.18}
        />
      </mesh>

      {/* Label plate */}
      <mesh position={[0, -0.63, 0.96]}>
        <boxGeometry args={[1.1, 0.12, 0.04]} />

        <meshStandardMaterial
          color="#334155"
          emissive="#3b82f6"
          emissiveIntensity={0.15}
        />
      </mesh>

      {/* Voltage indicator */}
      <mesh position={[-0.35, -0.63, 1.03]}>
        <boxGeometry args={[0.5, 0.035, 0.025]} />

        <meshStandardMaterial
          color="#38bdf8"
          emissive="#38bdf8"
          emissiveIntensity={1}
        />
      </mesh>

      {/* Feet */}
      {[-1, 1].map((x) => (
        <mesh
          key={x}
          position={[x * 1, -0.9, 0.5]}
        >
          <cylinderGeometry args={[0.13, 0.13, 0.18, 20]} />

          <meshStandardMaterial
            color="#020617"
            metalness={0.5}
          />
        </mesh>
      ))}
    </group>
  );
}

function Resistor({
  resistance,
}: {
  resistance: number;
}) {
  return (
    <group position={[-1.5, 0.15, 0]}>
      {/* Base */}
      <RoundedBox
        args={[2.25, 0.25, 1]}
        radius={0.08}
        smoothness={4}
        position={[0, -0.38, 0]}
        castShadow
      >
        <meshStandardMaterial
          color="#111827"
          metalness={0.75}
          roughness={0.25}
        />
      </RoundedBox>

      {/* Mounting posts */}
      {[-0.82, 0.82].map((x) => (
        <group key={x} position={[x, 0, 0]}>
          <mesh castShadow>
            <cylinderGeometry args={[0.085, 0.085, 0.58, 24]} />

            <meshStandardMaterial
              color="#cbd5e1"
              metalness={0.95}
              roughness={0.15}
            />
          </mesh>

          <mesh position={[0, 0.3, 0]}>
            <cylinderGeometry args={[0.15, 0.15, 0.06, 24]} />

            <meshStandardMaterial
              color="#64748b"
              metalness={0.95}
            />
          </mesh>
        </group>
      ))}

      {/* Ceramic resistor */}
      <mesh
        position={[0, 0.1, 0]}
        rotation={[0, 0, Math.PI / 2]}
        castShadow
      >
        <cylinderGeometry args={[0.28, 0.28, 1.5, 40]} />

        <meshStandardMaterial
          color="#d4b483"
          roughness={0.4}
        />
      </mesh>

      {/* Resistor bands */}
      {[
        [-0.4, "#7f1d1d"],
        [-0.12, "#111827"],
        [0.16, "#f59e0b"],
        [0.42, "#78350f"],
      ].map(([x, color], index) => (
        <mesh
          key={index}
          position={[Number(x), 0.1, 0]}
          rotation={[0, 0, Math.PI / 2]}
        >
          <torusGeometry
            args={[0.285, 0.038, 14, 32]}
          />

          <meshStandardMaterial
            color={String(color)}
            roughness={0.28}
          />
        </mesh>
      ))}

      {/* Leads */}
      {[-1.02, 1.02].map((x) => (
        <mesh
          key={x}
          position={[x, 0.1, 0]}
        >
          <cylinderGeometry args={[0.045, 0.045, 0.45, 20]} />

          <meshStandardMaterial
            color="#cbd5e1"
            metalness={0.95}
          />
        </mesh>
      ))}

      {/* Value plate */}
      <RoundedBox
        args={[1.2, 0.28, 0.05]}
        radius={0.04}
        smoothness={3}
        position={[0, -0.05, 0.32]}
      >
        <meshStandardMaterial
          color="#020617"
          emissive="#f59e0b"
          emissiveIntensity={0.12}
        />
      </RoundedBox>

      {/* Resistance indicator */}
      <mesh position={[0, 0.58, 0]}>
        <boxGeometry args={[0.9, 0.035, 0.035]} />

        <meshStandardMaterial
          color="#f59e0b"
          emissive="#f59e0b"
          emissiveIntensity={0.7}
        />
      </mesh>

      {/* Tiny hidden geometry keeps resistance connected */}
      <mesh visible={false}>
        <boxGeometry args={[resistance * 0.001, 0.001, 0.001]} />
      </mesh>
    </group>
  );
}

function Bulb({
  voltage,
  isRunning,
}: {
  voltage: number;
  isRunning: boolean;
}) {
  const brightness = isRunning
    ? Math.min(6, 1 + voltage / 3)
    : 0;

  return (
    <group position={[1.15, 0.85, 0]}>
      {/* Glow */}
      {isRunning && (
        <pointLight
          color="#ffd166"
          intensity={brightness * 2}
          distance={5}
          decay={2}
        />
      )}

      {/* Glass */}
      <mesh castShadow>
        <sphereGeometry args={[0.72, 48, 48]} />

        <meshPhysicalMaterial
          color="#fff7c2"
          transmission={0.3}
          thickness={0.12}
          roughness={0.08}
          transparent
          opacity={0.72}
          emissive={isRunning ? "#ffb703" : "#111827"}
          emissiveIntensity={brightness}
        />
      </mesh>

      {/* Filament */}
      <mesh position={[0, -0.05, 0]}>
        <torusGeometry args={[0.2, 0.025, 14, 32]} />

        <meshStandardMaterial
          color="#facc15"
          emissive={isRunning ? "#ffb703" : "#422006"}
          emissiveIntensity={isRunning ? 5 : 0}
        />
      </mesh>

      {/* Filament support */}
      <mesh position={[0, -0.32, 0]}>
        <cylinderGeometry args={[0.025, 0.025, 0.5, 12]} />

        <meshStandardMaterial
          color="#94a3b8"
          metalness={0.8}
        />
      </mesh>

      {/* Neck */}
      <mesh position={[0, -0.56, 0]}>
        <cylinderGeometry args={[0.25, 0.33, 0.35, 32]} />

        <meshStandardMaterial
          color="#d1d5db"
          metalness={0.75}
          roughness={0.2}
        />
      </mesh>

      {/* Screw base */}
      <mesh position={[0, -0.8, 0]} castShadow>
        <cylinderGeometry args={[0.38, 0.42, 0.45, 32]} />

        <meshStandardMaterial
          color="#9ca3af"
          metalness={0.95}
          roughness={0.18}
        />
      </mesh>

      {/* Base rings */}
      {[0, 0.12, 0.24, 0.36].map((y) => (
        <mesh
          key={y}
          position={[0, -0.98 + y, 0]}
        >
          <torusGeometry args={[0.39, 0.025, 12, 32]} />

          <meshStandardMaterial
            color="#64748b"
            metalness={0.95}
          />
        </mesh>
      ))}

      {/* Base */}
      <RoundedBox
        args={[1.35, 0.3, 1]}
        radius={0.08}
        smoothness={4}
        position={[0, -1.08, 0]}
        castShadow
      >
        <meshStandardMaterial
          color="#111827"
          metalness={0.75}
          roughness={0.25}
        />
      </RoundedBox>
    </group>
  );
}

function Ammeter({
  current,
  isRunning,
}: {
  current: number;
  isRunning: boolean;
}) {
  const displayedCurrent = useRef(0);

  /*
   * 7-segment display patterns
   *
   *       0
   *     -----
   *  5 |     | 1
   *     - 6 -
   *  4 |     | 2
   *     -----
   *       3
   */
  const segmentMap: Record<string, number[]> = {
    "0": [0, 1, 2, 3, 4, 5],
    "1": [1, 2],
    "2": [0, 1, 6, 4, 3],
    "3": [0, 1, 6, 2, 3],
    "4": [5, 6, 1, 2],
    "5": [0, 5, 6, 2, 3],
    "6": [0, 5, 6, 4, 3, 2],
    "7": [0, 1, 2],
    "8": [0, 1, 2, 3, 4, 5, 6],
    "9": [0, 1, 2, 3, 5, 6],
  };

  /*
   * Smoothly animate the displayed current.
   */
  useFrame((_, delta) => {
    const targetCurrent = isRunning ? current : 0;

    const animationSpeed = 7;

    displayedCurrent.current = THREE.MathUtils.lerp(
      displayedCurrent.current,
      targetCurrent,
      1 - Math.exp(-animationSpeed * delta)
    );
  });

  /*
   * Format current into a digital value.
   *
   * Example:
   * 2     -> 2.00
   * 0.5   -> 0.50
   * 10    -> 10.00
   */
  const formattedCurrent = Math.min(
    99.99,
    Math.max(0, current)
  ).toFixed(2);

  const displayCharacters = formattedCurrent.split("");

  /*
   * Seven-segment digit component.
   */
  const DigitalDigit = ({
    value,
    position,
  }: {
    value: string;
    position: [number, number, number];
  }) => {
    const activeSegments =
      segmentMap[value] ?? [];

    const segmentPositions: [
      number,
      number,
      number
    ][] = [
      [0, 0.25, 0],
      [0.16, 0.08, 0],
      [0.16, -0.2, 0],
      [0, -0.33, 0],
      [-0.16, -0.2, 0],
      [-0.16, 0.08, 0],
      [0, -0.025, 0],
    ];

    const segmentRotations = [
      0,
      Math.PI / 2,
      Math.PI / 2,
      0,
      Math.PI / 2,
      Math.PI / 2,
      0,
    ];

    return (
      <group position={position}>
        {segmentPositions.map(
          (segmentPosition, index) => {
            const active =
              activeSegments.includes(index);

            return (
              <mesh
                key={index}
                position={segmentPosition}
                rotation={[
                  0,
                  0,
                  segmentRotations[index],
                ]}
              >
                <boxGeometry
                  args={[
                    0.17,
                    0.045,
                    0.025,
                  ]}
                />

                <meshStandardMaterial
                  color={
                    active
                      ? "#22d3ee"
                      : "#083344"
                  }
                  emissive={
                    active
                      ? "#22d3ee"
                      : "#000000"
                  }
                  emissiveIntensity={
                    active ? 4 : 0
                  }
                  metalness={0.2}
                  roughness={0.3}
                />
              </mesh>
            );
          }
        )}
      </group>
    );
  };

  return (
    <group position={[4, 0.45, 0]}>
      {/* =====================================================
          AMMETER BODY
          ===================================================== */}

      <RoundedBox
        args={[1.8, 2.1, 1.1]}
        radius={0.1}
        smoothness={5}
        castShadow
      >
        <meshStandardMaterial
          color="#1e293b"
          metalness={0.82}
          roughness={0.2}
        />
      </RoundedBox>

      {/* Front panel */}
      <RoundedBox
        args={[1.5, 1.75, 0.08]}
        radius={0.04}
        smoothness={4}
        position={[0, 0, 0.59]}
      >
        <meshStandardMaterial
          color="#020617"
          metalness={0.4}
          roughness={0.25}
        />
      </RoundedBox>

      {/* =====================================================
          DIGITAL DISPLAY GLASS
          ===================================================== */}

      <RoundedBox
        args={[1.28, 0.7, 0.07]}
        radius={0.05}
        smoothness={4}
        position={[0, 0.43, 0.65]}
      >
        <meshStandardMaterial
          color="#001018"
          metalness={0.2}
          roughness={0.2}
          emissive="#062b36"
          emissiveIntensity={0.8}
        />
      </RoundedBox>

      {/* Display inner glass */}
      <RoundedBox
        args={[1.16, 0.58, 0.025]}
        radius={0.035}
        smoothness={3}
        position={[0, 0.43, 0.695]}
      >
        <meshStandardMaterial
          color="#020617"
          metalness={0.1}
          roughness={0.1}
          emissive={
            isRunning
              ? "#063d4a"
              : "#020617"
          }
          emissiveIntensity={
            isRunning ? 1 : 0
          }
        />
      </RoundedBox>

      {/* =====================================================
          DIGITAL 7-SEGMENT VALUE
          ===================================================== */}

      <group position={[0, 0.43, 0.73]}>
        {displayCharacters.map(
          (character, index) => {
            /*
             * Decimal point
             */
            if (character === ".") {
              return (
                <mesh
                  key={`${character}-${index}`}
                  position={[
                    -0.01 +
                      index * 0.2,
                    -0.31,
                    0,
                  ]}
                >
                  <sphereGeometry
                    args={[
                      0.035,
                      16,
                      16,
                    ]}
                  />

                  <meshStandardMaterial
                    color={
                      isRunning
                        ? "#22d3ee"
                        : "#083344"
                    }
                    emissive={
                      isRunning
                        ? "#22d3ee"
                        : "#000000"
                    }
                    emissiveIntensity={
                      isRunning ? 4 : 0
                    }
                  />
                </mesh>
              );
            }

            return (
              <DigitalDigit
                key={`${character}-${index}`}
                value={character}
                position={[
                  -0.45 +
                    index * 0.22,
                  0,
                  0,
                ]}
              />
            );
          }
        )}

        {/* A symbol */}
        <group
          position={[0.58, 0, 0]}
        >
          <mesh
            position={[0, 0, 0]}
          >
            <torusGeometry
              args={[
                0.12,
                0.025,
                12,
                24,
                0,
                Math.PI * 1.6,
              ]}
            />

            <meshStandardMaterial
              color="#22d3ee"
              emissive="#22d3ee"
              emissiveIntensity={
                isRunning ? 3 : 0.3
              }
            />
          </mesh>

          <mesh
            position={[
              -0.08,
              -0.02,
              0,
            ]}
          >
            <boxGeometry
              args={[0.16, 0.025, 0.025]}
            />

            <meshStandardMaterial
              color="#22d3ee"
              emissive="#22d3ee"
              emissiveIntensity={
                isRunning ? 3 : 0.3
              }
            />
          </mesh>
        </group>
      </group>

      {/* =====================================================
          CURRENT STATUS LED
          ===================================================== */}

      <mesh
        position={[-0.55, 0.02, 0.65]}
      >
        <sphereGeometry
          args={[0.055, 20, 20]}
        />

        <meshStandardMaterial
          color={
            isRunning
              ? "#22c55e"
              : "#475569"
          }
          emissive={
            isRunning
              ? "#22c55e"
              : "#000000"
          }
          emissiveIntensity={
            isRunning ? 3 : 0
          }
        />
      </mesh>

      {/* =====================================================
          AMMETER LABEL
          ===================================================== */}

      <mesh
        position={[0, -0.22, 0.65]}
      >
        <boxGeometry
          args={[0.55, 0.035, 0.025]}
        />

        <meshStandardMaterial
          color="#64748b"
          emissive="#334155"
          emissiveIntensity={0.5}
        />
      </mesh>

      {/* =====================================================
          CURRENT BAR
          ===================================================== */}

      <mesh
        position={[0, -0.48, 0.65]}
      >
        <boxGeometry
          args={[1.05, 0.07, 0.025]}
        />

        <meshStandardMaterial
          color="#0f172a"
          metalness={0.5}
          roughness={0.3}
        />
      </mesh>

      <mesh
        position={[
          -0.525 +
            Math.min(
              1,
              Math.max(
                0,
                displayedCurrent.current /
                  5
              )
            ) *
              0.525,
          -0.48,
          0.68,
        ]}
      >
        <boxGeometry
          args={[
            Math.min(
              1.05,
              Math.max(
                0.01,
                (displayedCurrent.current /
                  5) *
                  1.05
              ),
            ),
            0.07,
            0.03,
          ]}
        />

        <meshStandardMaterial
          color={
            isRunning
              ? "#22d3ee"
              : "#1e293b"
          }
          emissive={
            isRunning
              ? "#22d3ee"
              : "#000000"
          }
          emissiveIntensity={
            isRunning ? 2 : 0
          }
        />
      </mesh>

      {/* =====================================================
          TERMINALS
          ===================================================== */}

      <mesh
        position={[-0.55, -0.75, 0.62]}
        castShadow
      >
        <cylinderGeometry
          args={[0.13, 0.13, 0.18, 24]}
        />

        <meshStandardMaterial
          color="#111827"
          metalness={0.9}
          roughness={0.18}
        />
      </mesh>

      <mesh
        position={[0.55, -0.75, 0.62]}
        castShadow
      >
        <cylinderGeometry
          args={[0.13, 0.13, 0.18, 24]}
        />

        <meshStandardMaterial
          color="#dc2626"
          metalness={0.9}
          roughness={0.18}
        />
      </mesh>

      {/* Terminal highlights */}
      <mesh
        position={[-0.55, -0.64, 0.62]}
      >
        <sphereGeometry
          args={[0.045, 16, 16]}
        />

        <meshStandardMaterial
          color="#475569"
          metalness={1}
          roughness={0.1}
        />
      </mesh>

      <mesh
        position={[0.55, -0.64, 0.62]}
      >
        <sphereGeometry
          args={[0.045, 16, 16]}
        />

        <meshStandardMaterial
          color="#f87171"
          metalness={1}
          roughness={0.1}
        />
      </mesh>

      {/* Hidden geometry keeps current reactive */}
      <mesh visible={false}>
        <boxGeometry
          args={[
            displayedCurrent.current *
              0.001,
            0.001,
            0.001,
          ]}
        />
      </mesh>
    </group>
  );
}

/* =========================================================
   PHYSICAL SWITCH
   ========================================================= */

function PhysicalSwitch({
  switchOn,
  onToggle,
}: {
  switchOn: boolean;
  onToggle: () => void;
}) {
  return (
    <group
      position={[2.7, 0.15, 1.25]}
      onClick={(event) => {
        event.stopPropagation();
        onToggle();
      }}
    >
      {/* Switch base */}
      <RoundedBox
        args={[1.8, 0.22, 0.9]}
        radius={0.08}
        smoothness={5}
        castShadow
      >
        <meshStandardMaterial
          color="#111827"
          metalness={0.75}
          roughness={0.25}
        />
      </RoundedBox>

      {/* Left terminal */}
      <mesh
        position={[-0.65, 0.18, 0]}
        castShadow
      >
        <cylinderGeometry
          args={[0.11, 0.11, 0.12, 24]}
        />

        <meshStandardMaterial
          color="#dc2626"
          metalness={0.9}
          roughness={0.18}
        />
      </mesh>

      {/* Right terminal */}
      <mesh
        position={[0.65, 0.18, 0]}
        castShadow
      >
        <cylinderGeometry
          args={[0.11, 0.11, 0.12, 24]}
        />

        <meshStandardMaterial
          color="#94a3b8"
          metalness={0.9}
          roughness={0.18}
        />
      </mesh>

      {/* Switch lever */}
      <group
        position={[
          switchOn ? 0.35 : -0.25,
          0.48,
          0,
        ]}
        rotation={[
          0,
          0,
          switchOn ? -0.18 : 0.45,
        ]}
      >
        <mesh castShadow>
          <boxGeometry args={[1.05, 0.12, 0.12]} />

          <meshStandardMaterial
            color="#cbd5e1"
            metalness={0.95}
            roughness={0.15}
          />
        </mesh>

        {/* Lever tip */}
        <mesh position={[0.48, 0, 0]}>
          <sphereGeometry args={[0.1, 20, 20]} />

          <meshStandardMaterial
            color={
              switchOn
                ? "#22c55e"
                : "#64748b"
            }
            emissive={
              switchOn
                ? "#22c55e"
                : "#000000"
            }
            emissiveIntensity={
              switchOn ? 1.5 : 0
            }
          />
        </mesh>
      </group>

      {/* Status LED */}
      <mesh
        position={[0, 0.23, 0.35]}
      >
        <sphereGeometry args={[0.07, 20, 20]} />

        <meshStandardMaterial
          color={
            switchOn
              ? "#22c55e"
              : "#ef4444"
          }
          emissive={
            switchOn
              ? "#22c55e"
              : "#ef4444"
          }
          emissiveIntensity={
            switchOn ? 2 : 0.5
          }
        />
      </mesh>

      {/* Switch label */}
      <mesh
        position={[0, 0.24, -0.35]}
      >
        <boxGeometry
          args={[0.9, 0.04, 0.18]}
        />

        <meshStandardMaterial
          color={
            switchOn
              ? "#14532d"
              : "#1e293b"
          }
          emissive={
            switchOn
              ? "#166534"
              : "#000000"
          }
          emissiveIntensity={0.5}
        />
      </mesh>
    </group>
  );
}

/* =========================================================
   CURRENT PARTICLES
   ========================================================= */

function CurrentParticles({
  isRunning,
  current,
}: {
  isRunning: boolean;
  current: number;
}) {
  const particleRefs = useRef<THREE.Mesh[]>([]);
  const progressRefs = useRef<number[]>([]);

  const circuitCurve = useMemo(() => {
    const points = [
      // Power supply positive
      new THREE.Vector3(-3.9, -0.12, 1.02),

      // Towards resistor
      new THREE.Vector3(-3.1, 0, 1.2),
      new THREE.Vector3(-2.5, 0.15, 0.5),
      new THREE.Vector3(-2.0, 0.25, 0.2),

      // Through resistor
      new THREE.Vector3(-0.5, 0.25, 0.2),

      // Towards bulb
      new THREE.Vector3(0, 0.4, 0.8),
      new THREE.Vector3(0.78, 0.75, 0.2),
      new THREE.Vector3(1.5, 0.75, 0.2),

      // Towards switch
      new THREE.Vector3(2.05, 0.5, 1.05),
      new THREE.Vector3(2.45, 0.3, 1.25),

      // Switch gap
      new THREE.Vector3(2.7, 0.3, 1.25),

      new THREE.Vector3(2.95, 0.3, 1.25),

      // Towards ammeter
      new THREE.Vector3(3.2, 0.05, 1.1),
      new THREE.Vector3(3.35, -0.12, 1),

      // Ammeter return
      new THREE.Vector3(4.55, -0.12, 1),

      // Return wire
      new THREE.Vector3(5, -0.5, 1.5),
      new THREE.Vector3(2.5, -0.55, 1.8),
      new THREE.Vector3(0, -0.55, 1.8),
      new THREE.Vector3(-2.5, -0.55, 1.8),
      new THREE.Vector3(-4.9, -0.35, 1),
    ];

    return new THREE.CatmullRomCurve3(
      points,
      true,
      "catmullrom",
      0.15
    );
  }, []);

  /*
   * Create different starting positions for particles.
   */
  if (progressRefs.current.length === 0) {
    progressRefs.current = Array.from(
      { length: 24 },
      (_, index) => index / 24
    );
  }

  useFrame((_, delta) => {
    if (!isRunning) return;

    /*
     * Higher current = faster electron movement.
     *
     * Minimum speed keeps particles visible even
     * when current is relatively small.
     */
    const speed = 0.08 + Math.min(current, 10) * 0.025;

    particleRefs.current.forEach(
      (particle, index) => {
        if (!particle) return;

        progressRefs.current[index] +=
          delta * speed;

        /*
         * Restart particle after completing
         * the complete circuit.
         */
        if (progressRefs.current[index] >= 1) {
          progressRefs.current[index] -= 1;
        }

        const point =
          circuitCurve.getPointAt(
            progressRefs.current[index]
          );

        particle.position.copy(point);
      }
    );
  });

  if (!isRunning) {
    return null;
  }

  return (
    <>
      {Array.from({ length: 24 }).map(
        (_, index) => (
          <mesh
            key={index}
            ref={(mesh) => {
              if (mesh) {
                particleRefs.current[index] =
                  mesh;
              }
            }}
          >
            <sphereGeometry
              args={[0.055, 12, 12]}
            />

            <meshStandardMaterial
              color="#38bdf8"
              emissive="#38bdf8"
              emissiveIntensity={5}
              metalness={0.2}
              roughness={0.15}
            />
          </mesh>
        )
      )}
    </>
  );
}

/* =========================================================
   LAB BACKGROUND
   ========================================================= */

function LabBackground() {
  return (
    <>
      {/* Back wall */}
      <mesh position={[0, 2.4, -2.8]}>
        <boxGeometry
          args={[18, 7, 0.25]}
        />

        <meshStandardMaterial
          color="#0b1220"
          roughness={0.9}
        />
      </mesh>

      {/* Wall panels */}
      {[-5.5, 0, 5.5].map((x) => (
        <mesh
          key={x}
          position={[x, 2.6, -2.62]}
        >
          <boxGeometry
            args={[4.6, 4.4, 0.05]}
          />

          <meshStandardMaterial
            color="#111c2e"
            metalness={0.15}
            roughness={0.75}
          />
        </mesh>
      ))}

      {/* Neon strips */}
      {[-5.5, 0, 5.5].map((x) => (
        <mesh
          key={x}
          position={[x, 4.35, -2.5]}
        >
          <boxGeometry
            args={[3.6, 0.035, 0.035]}
          />

          <meshStandardMaterial
            color="#38bdf8"
            emissive="#0284c7"
            emissiveIntensity={2}
          />
        </mesh>
      ))}

      {/* Shelf */}
      <mesh
        position={[5.2, 1.15, -2.35]}
      >
        <boxGeometry
          args={[3.2, 0.18, 0.7]}
        />

        <meshStandardMaterial
          color="#334155"
          metalness={0.6}
        />
      </mesh>

      {/* Background equipment */}
      {[-6.2, 6.2].map((x) => (
        <RoundedBox
          key={x}
          args={[1.4, 1.9, 0.8]}
          radius={0.08}
          smoothness={4}
          position={[x, 0.45, -2.15]}
        >
          <meshStandardMaterial
            color="#1e293b"
            metalness={0.7}
            roughness={0.3}
          />
        </RoundedBox>
      ))}
    </>
  );
}

/* =========================================================
   MAIN SCENE
   ========================================================= */

function Scene({
  voltage,
  resistance,
  isRunning,
  switchOn,
  onSwitchToggle,
}: OhmLawSceneProps) {
  const current = isRunning
  ? voltage / resistance
  : 0;

  return (
    <>
      <color
        attach="background"
        args={["#020617"]}
      />

      <fog
        attach="fog"
        args={["#020617", 11, 25]}
      />

      {/* Lighting */}
      <ambientLight intensity={0.65} />

      <directionalLight
        position={[3, 8, 6]}
        intensity={2.8}
        castShadow
        shadow-mapSize-width={2048}
        shadow-mapSize-height={2048}
      />

      <pointLight
        position={[-5, 4, 2]}
        intensity={2}
        color="#38bdf8"
      />

      <pointLight
        position={[2, 4, 1]}
        intensity={1.8}
        color="#f59e0b"
      />

      <LabBackground />

      {/* Main work bench */}
      <RoundedBox
        args={[15, 0.55, 6]}
        radius={0.15}
        smoothness={5}
        position={[0, -0.7, 0]}
        receiveShadow
      >
        <meshStandardMaterial
          color="#263244"
          metalness={0.5}
          roughness={0.32}
        />
      </RoundedBox>

      {/* Power Supply */}
      <PowerSupply voltage={voltage} />

      {/* Resistor */}
      <Resistor resistance={resistance} />

      {/* Bulb */}
      <Bulb
        voltage={voltage}
        isRunning={isRunning}
      />

      {/* Ammeter */}
      <Ammeter
        current={current}
        isRunning={isRunning}
      />

      {/* Physical Switch */}
      <PhysicalSwitch
        switchOn={switchOn}
        onToggle={onSwitchToggle}
      />

      {/* =====================================================
          RED CIRCUIT WIRES
          ===================================================== */}

      <Wire
        points={[
          [-3.9, -0.12, 1.02],
          [-3.1, 0, 1.2],
          [-2.5, 0.15, 0.5],
          [-2.0, 0.25, 0.2],
        ]}
        color="#dc2626"
        active={isRunning}
      />

      <Wire
        points={[
          [-0.5, 0.25, 0.2],
          [0, 0.4, 0.8],
          [0.78, 0.75, 0.2],
        ]}
        color="#dc2626"
        active={isRunning}
      />

      {/* Wire through switch area */}
      <Wire
        points={[
          [1.5, 0.75, 0.2],
          [2.05, 0.5, 1.05],
          [2.45, 0.3, 1.25],
        ]}
        color="#dc2626"
        active={isRunning}
      />

      <Wire
        points={[
          [2.95, 0.3, 1.25],
          [3.2, 0.05, 1.1],
          [3.35, -0.12, 1],
        ]}
        color="#dc2626"
        active={isRunning}
      />

      {/* =====================================================
          BLACK RETURN WIRE
          ===================================================== */}

      <Wire
        points={[
          [4.55, -0.12, 1],
          [5, -0.5, 1.5],
          [2.5, -0.55, 1.8],
          [0, -0.55, 1.8],
          [-2.5, -0.55, 1.8],
          [-4.9, -0.35, 1],
        ]}
        color="#111827"
        active={isRunning}
      />

      {/* Current particles */}
      <CurrentParticles
        isRunning={isRunning}
        current={current}
      />

      {/* Ground shadows */}
      <ContactShadows
        position={[0, -0.4, 0]}
        opacity={0.55}
        scale={16}
        blur={2.5}
        far={5}
      />

      {/* Environment */}
      <Environment preset="warehouse" />
    </>
  );
}

/* =========================================================
   CANVAS WRAPPER
   ========================================================= */

function OhmLawScene({
  voltage,
  resistance,
  isRunning,
  switchOn,
  onSwitchToggle,
}: OhmLawSceneProps) {
  return (
    <div className="w-full h-[600px] rounded-2xl overflow-hidden border border-slate-700 shadow-2xl">
      <Canvas
        shadows
        camera={{
          position: [0, 5.2, 11],
          fov: 42,
        }}
        gl={{
          antialias: true,
          powerPreference: "high-performance",
        }}
      >
        <Scene
          voltage={voltage}
          resistance={resistance}
          isRunning={isRunning}
          switchOn={switchOn}
          onSwitchToggle={onSwitchToggle}
        />

        <OrbitControls
          enablePan={false}
          minDistance={7}
          maxDistance={17}
          minPolarAngle={Math.PI / 5}
          maxPolarAngle={Math.PI / 2.05}
          target={[0, 0.3, 0]}
        />
      </Canvas>
    </div>
  );
}

export default OhmLawScene;