import { Fragment } from 'react';
import { connect } from 'react-redux';

const Example = (props) => {
    // let onClickHandler = () => {
    //     props.onIncrementCounter();
    // }
    return(
        <Fragment>
            <h1>this is in TestAction : {props.ctr}</h1>
            <button onClick={props.onIncrementCounter} >Click me</button>
        </Fragment>
    )
}

const mapStateToProps = state => {
    return{
        ctr : state.ctr.counter
    }
}

const mapDispatchToProps = dispatch => {
    return {
        onIncrementCounter : () => dispatch({type : 'INCREMENT', val : 20})
    }
}

// const mapDispatchToProps = (dispatch) => {
//     return bindActionCreators({
//         onIncrementCounter : {type: 'INCREMENT'}, dispatch
//     });
// }

export default connect(mapStateToProps, mapDispatchToProps)(Example);