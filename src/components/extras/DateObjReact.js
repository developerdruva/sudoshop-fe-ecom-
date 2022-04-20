import { useState } from "react";
import DateObject from "react-date-object";
import { Fragment } from "react/cjs/react.production.min";

export default function DateObjReact() {
    let date = new DateObject();
    const [datex, setDatex] = useState();
    let callDate = () => {
        console.log('call date called')
        console.log(typeof date.format())
        setDatex(date.getValue());
    }

    // console.log(date.date);
    return(
        <Fragment>
            <div className="container">
                <button onClick={()=> callDate()}>date</button>
                <p>{datex}</p>    
            </div>
        </Fragment>
    )
}