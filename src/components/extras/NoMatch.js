import { Fragment } from "react/cjs/react.production.min"
import { BiUnlink } from 'react-icons/bi';

const NoMatch = () => {
    return(
        <Fragment>
            <div className="container vh-100 m-5">
                <div className="text-center">
                    <p className="lead mytextcolor fs-2 ">404 Page Not Found</p>
                    <BiUnlink style={{color: 'darkcyan', fontSize: "20rem"}}/>
                </div>
            </div>
        </Fragment>
    )
}

export default NoMatch;