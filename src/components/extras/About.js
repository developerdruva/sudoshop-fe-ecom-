import { Fragment } from "react/cjs/react.production.min"
import {MdConstruction} from 'react-icons/md';

const About = () => {
    return (
        <Fragment>
           <div className="container vh-75 m-5">
                <div className="col-md-6 m-5">
                    <p className="lead mytextcolor fs-2 ">Under construction........</p>
                    <MdConstruction style={{color: 'darkcyan', fontSize: "20rem"}}/>
                </div>
            </div>
        </Fragment>
    )
}

export default About;