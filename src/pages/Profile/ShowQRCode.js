import classNames from "classnames/bind";
import styles from './Profile.module.scss';
import { Alert } from "react-bootstrap";
import QRCode from "react-qr-code";
const cx = classNames.bind(styles)

function InfoProfile ({value, setShow}) {
    console.log(value)
    return (
        <div className='alert-wrapper'>
            <Alert variant="white" onClose={() => setShow(false)} dismissible>
                <QRCode
                    size={256}
                    style={{ height: "300px", maxWidth: "300px", width: "100%" }}
                    value={value}
                    viewBox={`0 0 256 256`}
                    />
            </Alert>
        </div>
    )
}

export default InfoProfile