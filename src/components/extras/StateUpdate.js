import { Fragment, useState } from 'react';

const StateUpdate = () => {
    const [temp, setTemp] = useState('');
    const [fieldData, setFieldData] = useState([]);
    const updateState = (event)=>{
        setFieldData([...fieldData, temp]);
    }
    console.log(temp, 'temp  -----------------------');
    console.log(fieldData, 'fieldData  -----------------------');

    return(
        <Fragment>
            <h1>this is in TestAction : {}</h1>
            <input type='text' name='textfield' onChange={(event)=>setTemp(event.target.value)} />
            <button type='' onClick={()=>updateState()}>Click</button>
            {fieldData.map((item,index)=>{
                return <div>
                    <ul key={index}>
                        <li>{index}</li>
                        <li>{item}</li>
                    </ul>
                </div>
            })}
        </Fragment>
    )

}

export default StateUpdate;