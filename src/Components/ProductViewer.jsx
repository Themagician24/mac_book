import { OrbitControls } from '@react-three/drei';
import { Canvas } from '@react-three/fiber';
import clsx from 'clsx';
import useMacbookStore from '../store/index.js';
import MacbookModel14 from './models/Macbook-14.jsx';
import StudioLights from './three/StudioLights.jsx';


import ModelSwitcher from './three/ModelSwitcher.jsx';
import { useMediaQuery } from 'react-responsive';

const ProductViewer = () => {

   const {color, scale , setColor, setScale} = useMacbookStore();

   const isMobile = useMediaQuery({query: '(max-width: 1024px)'});


  return (
    <section id="product-viewer">
        <h2> Take a closer look. </h2>

        <div className="controls">
            <p className="info">
                {/* MacBook Pro || Available in 14" & 16" in Space Gray & Dark colors */}
            </p>

            <div className="flex-center gap-5 mt-5">
                <div className="color-control">

                    <div onClick={() => setColor('#adb5bd')}
                     className={clsx('bg-neutral-300', color === '#adb5bd' && 'active')}
                     />

                    <div onClick={() => setColor('#2e2c2e')}
                     className={clsx('bg-neutral-900', color === '#2e2c2e' && 'active')}
                     />

                    <div onClick={() => setColor('#ef4444')}
                     className={clsx('bg-red-500', color === '#ef4444' && 'active')}
                     />

                    <div onClick={() => setColor('#ec4899')}
                     className={clsx('bg-pink-500', color === '#ec4899' && 'active')}
                     />

                    <div onClick={() => setColor('#22c55e')}
                     className={clsx('bg-green-500', color === '#22c55e' && 'active')}
                     />

                    <div onClick={() => setColor('#f97316')}
                     className={clsx('bg-orange-500', color === '#f97316' && 'active')}
                     />

                    <div onClick={() => setColor('#9ca3af')}
                     className={clsx('bg-gray-400', color === '#9ca3af' && 'active')}
                     />

                    <div onClick={() => setColor('#3b82f6')}
                     className={clsx('bg-blue-500', color === '#3b82f6' && 'active')}
                     />

                </div>


                <div className="size-control">
                    <div onClick={() => setScale(0.06)}
                     className={clsx( scale === 0.06 ? 'bg-white text-black' : 'bg-transparent text-white')}
                     >
                        <p>14"</p>
                        </div>

                    <div onClick={() => setScale(0.08)}
                     className={clsx( scale === 0.08 ? 'bg-white text-black' : 'bg-transparent text-white')}
                     >
                        <p>16"</p>
                        </div>

                </div>
            </div>
        </div>

       <Canvas id="canvas" camera={{position: [0, 2, 5] , fov: 50, near: 0.1, far: 100}}>

      <StudioLights/>

        {/* <MacbookModel14 scale={0.06} position={[0, 0, 0]} />

        <OrbitControls enableZoom={false} /> */}

        <ModelSwitcher scale={isMobile ? scale -0.03 : scale} isMobile={isMobile}/>

       </Canvas>

    </section>
  )
}

export default ProductViewer
