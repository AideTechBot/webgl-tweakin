import Head from 'next/head'
import React, { Suspense, useState, useRef } from 'react'
import { Canvas, useLoader } from '@react-three/fiber'
import { useFrame } from '@react-three/fiber'
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader'
import duck from './mdionne-head.glb'

function Duck() {
  const gltf = useLoader(GLTFLoader, './webgl-tweakin/mdionne-head.glb');
  return <primitive object={gltf.scene} position={[0, 0, 0]} />
}

function Box() {
  return (
    <mesh castShadow>
      <boxBufferGeometry attach="geometry" args={[1, 1, 1]} />
      <meshStandardMaterial attach="material" color="red" transparent opacity={1.0} />
    </mesh>
  )
}

function GroundPlane() {
  return (
    <mesh receiveShadow rotation={[5, 0, 0]} position={[0, -1, 0]}>
      <planeBufferGeometry attach="geometry" args={[500, 500]} />
      <meshStandardMaterial attach="material" color="white" />
    </mesh>
  );
}
function BackDrop() {
  return (
    <mesh receiveShadow position={[0, -1, -5]}>
      <planeBufferGeometry attach="geometry" args={[500, 500]} />
      <meshStandardMaterial attach="material" color="white" />
    </mesh>
  );
}
function Sphere() {
  return (
    <mesh
      visible
      userData={{ test: "hello" }}
      position={[0, 0, 0]}
      rotation={[0, 0, 0]}
      castShadow
    >
      <sphereGeometry attach="geometry" args={[1, 16, 16]} />
      <meshStandardMaterial
        attach="material"
        color="white"
        transparent
        roughness={0.1}
        metalness={0.1}
      />
    </mesh>
  );
}

// Lights
function KeyLight({ brightness, color }) {
  const ref = useRef()
  useFrame(() => (ref.current.rotation.y += 0.02));

  return (
    // <group ref={ref}>
    <rectAreaLight
      ref={ref}
      width={3}
      height={3}
      color={color}
      intensity={brightness}
      position={[-2, 0, 5]}
      lookAt={[0, 0, 0]}
      penumbra={1}
      castShadow
    />
  );
}
function FillLight({ brightness, color }) {
  const ref = useRef()
  useFrame(() => (ref.current.rotation.y += 0.01));
  return (
    <rectAreaLight
      ref={ref}
      width={3}
      height={3}
      intensity={brightness}
      color={color}
      position={[2, 1, 4]}
      lookAt={[0, 0, 0]}
      penumbra={2}
      castShadow
    />
  );
}
function RimLight({ brightness, color }) {
  return (
    <rectAreaLight
      width={2}
      height={2}
      intensity={brightness}
      color={color}
      position={[1, 4, -2]}
      rotation={[0, 180, 0]}
      castShadow
    />
  );
}


export default function Home() {
  // const [clicked, set] = useState(false);

  return (
    <div className="container">
      <Head>
        <title>WebGL</title>
        <link rel="icon" href="/favicon.ico" />
        <meta name="description" content="A weird webGL toy I made in my spare time." />
      </Head>

      <main>
        <h1 className="title">
          Testing out <a href="https://www.khronos.org/webgl/">WebGL!</a>
        </h1>

        <p className="description">
          Lets see how this gooooes...
        </p>

        <Canvas camera={{ position: [0, 0, 10] }} style={{
          height:'350px',
        }}>
          {/* <ambientLight intensity={0.5} />
          <spotLight intensity={0.8} position={[300, 300, 400]} />
          <Suspense fallback={<Box />}>{clicked && <Duck />}</Suspense> */}
          <GroundPlane />
          <BackDrop />
          <KeyLight brightness={5.6} color="#ffbdf4" />
          <FillLight brightness={2.6} color="#bdefff" />
          <RimLight brightness={54} color="#fff" />
          <Sphere />
        </Canvas>
        {/* {!clicked && <button onClick={() => set(true)}>Load duck w/ 1s delay</button>} */}
      </main>

      <footer>
        <a
          href="https://mdionne.me"
          target="_blank"
          rel="noopener noreferrer"
        >
          Powered by certified epic mdionne gamer fuel moments
        </a>
      </footer>

      <style jsx>{`
        .container {
          min-height: 100vh;
          padding: 0 0.5rem;
          display: flex;
          flex-direction: column;
          justify-content: center;
          align-items: center;
        }

        main {
          padding: 5rem 0;
          flex: 1;
          display: flex;
          flex-direction: column;
          justify-content: center;
          align-items: center;
        }

        footer {
          width: 100%;
          height: 50px;
          border-top: 1px solid #eaeaea;
          display: flex;
          justify-content: center;
          align-items: center;
        }

        footer a {
          display: flex;
          justify-content: center;
          align-items: center;
        }

        a {
          color: inherit;
          text-decoration: none;
        }

        .title a {
          color: #0070f3;
          text-decoration: none;
        }

        .title a:hover,
        .title a:focus,
        .title a:active {
          text-decoration: underline;
        }

        .title {
          margin: 0;
          line-height: 1.15;
          font-size: 4rem;
        }

        .title,
        .description {
          text-align: center;
        }

        .description {
          line-height: 1.5;
          font-size: 1.5rem;
        }

        code {
          background: #fafafa;
          border-radius: 5px;
          padding: 0.75rem;
          font-size: 1.1rem;
          font-family: Menlo, Monaco, Lucida Console, Liberation Mono,
            DejaVu Sans Mono, Bitstream Vera Sans Mono, Courier New, monospace;
        }

        .grid {
          display: flex;
          align-items: center;
          justify-content: center;
          flex-wrap: wrap;

          max-width: 800px;
          margin-top: 3rem;
        }

        .card {
          margin: 1rem;
          flex-basis: 45%;
          padding: 1.5rem;
          text-align: left;
          color: inherit;
          text-decoration: none;
          border: 1px solid #eaeaea;
          border-radius: 10px;
          transition: color 0.15s ease, border-color 0.15s ease;
        }

        .card:hover,
        .card:focus,
        .card:active {
          color: #0070f3;
          border-color: #0070f3;
        }

        .card h3 {
          margin: 0 0 1rem 0;
          font-size: 1.5rem;
        }

        .card p {
          margin: 0;
          font-size: 1.25rem;
          line-height: 1.5;
        }

        .logo {
          height: 1em;
        }

        @media (max-width: 600px) {
          .grid {
            width: 100%;
            flex-direction: column;
          }
        }
      `}</style>

      <style jsx global>{`
        html,
        body {
          padding: 0;
          margin: 0;
          font-family: -apple-system, BlinkMacSystemFont, Segoe UI, Roboto,
            Oxygen, Ubuntu, Cantarell, Fira Sans, Droid Sans, Helvetica Neue,
            sans-serif;
        }

        * {
          box-sizing: border-box;
        }
      `}</style>
    </div>
  )
}
