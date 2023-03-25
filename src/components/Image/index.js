import classNames from "classnames";
import styles from './Image.module.scss'

const Image =({ src, alt, className, ...props }) => {
   
    return (
        <img
            className={classNames(styles.wrapper, className)}
            src={src}
            alt={alt}
            {...props}
        />
    );
}

export default Image