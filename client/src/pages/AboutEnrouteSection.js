import React, { useContext } from "react";
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
    root: {
        height: '100vh',
    }
}));

const AboutEnrouteSection = () => {
    const classes = useStyles();
    
    return (
        <div className={classes.root}>
            Our product is a one stop solution to delivery management. Delivery management systems are platforms on which customers can have their products delivered efficiently 
            by choosing their own choice of services from many available delivery services. This system can provide many delivery services and can suggest the best option or deal. 
            A delivery company can also register for the delivery service they are providing. Once the order is shipped, customers can track the status of the order and can live 
            track the order until it is delivered. Also, our service provides a platform for communication between customers and the managers or the delivery companies for inquiry 
            or to resolve any issue. (TEMP)
        </div>
    );   
};

export default AboutEnrouteSection;