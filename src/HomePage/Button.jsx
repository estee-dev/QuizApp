import styles from './HomePage.module.css'
import PropTypes from 'prop-types'

function Button (props){
    return(
        <button className={styles.button} onClick={props.onClick}>
            {props.name}
        </button>
    )
}


Button.propTypes = {
    name: PropTypes.string.isRequired,
    onClick: PropTypes.func,
};

export default Button