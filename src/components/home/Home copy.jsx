import { useEffect, useState } from 'react';
import { motion, AnimateSharedLayout, AnimatePresence } from 'framer-motion';
import './home.css';
// import './home.module.css';
import { hero } from '../../assets/img/hero';
import { moscow } from '../../assets/img/cities';

// Components
import NavBar from './NavBar';
import Banner from './Banner';
import Loader from './Loader';

export default function Home() {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loading
      ? document.querySelector('body').classList.add('loading')
      : document.querySelector('body').classList.remove('loading');
  }, [loading]);

  return (
    <AnimateSharedLayout type="crossfade">
      <AnimatePresence>
        {loading ? (
          <motion.div key="loader">
            <Loader setLoading={setLoading} />
          </motion.div>
        ) : (
          <>
            {/* <NavBar /> */}
            <Banner />
            {!loading && (
              // <div className="transition-image final">
              <div className=" top-[-128] flex flex-row justify-center items-center">
                <motion.img
                  transition={{ ease: [0.6, 0.01, -0.05, 0.9], duration: 1.6 }}
                  // src="/images/image-2.jpg"
                  // src="/image-2.jpg"
                  // src={hero}
                  src={moscow}
                  layoutId="main-image-1"
                />
              </div>
            )}
          </>
        )}
      </AnimatePresence>
    </AnimateSharedLayout>
  );
}
