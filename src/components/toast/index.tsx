import { memo } from 'react';

import { ToastContainer, Flip } from 'react-toastify';

const Toast = () => {
    return <ToastContainer theme="dark" transition={Flip} position="top-right" newestOnTop draggable={false} />;
};

export default memo(Toast);
