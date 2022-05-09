
import React , {forwardRef, useState , useImperativeHandle} from "react";
import {motion, AnimatePresence} from "framer-motion";


const Popup = forwardRef((props , ref) => {
    const [open,setOpen] = useState(false);
    useImperativeHandle(ref, () => {
        return {
            open: () => {return setOpen(true)},
            close: () => {return setOpen(false)},
        }
    });


    return (
        <AnimatePresence>
            {
                open && (
                    <motion.div 
                        initial={{ opacity: 0}}
                        animate={{ opacity: 1}}
                        exit={{ opacity: 0}}
                        transition={{ duration: 0.3 }}
                        className="popUp"
                        onClick={(e) => {
                            e.stopPropagation();
                            if(e.target.className == "popUp") {
                                setOpen(false);
                            }
                        }}
                    >
                        <div className="inner">
                            123123
                        </div>
                    </motion.div>
                )
            }
        </AnimatePresence>
    );
});

export default Popup;