import React, {Component} from 'react'
import {withStyles, Typography} from '@material-ui/core';
import {darken} from '@material-ui/core/styles/colorManipulator';
import {FuseAnimate} from '@fuse';
import {withRouter} from 'react-router-dom';
import classNames from 'classnames';


const styles = theme => ({
    root : {
        background: 'linear-gradient(to right, ' + theme.palette.primary.dark + ' 0%, ' + darken(theme.palette.primary.dark, 0.5) + ' 100%)',
        color     : theme.palette.primary.contrastText
    }
});

class Welcome extends Component {

    state = {
        tabValue: 0
    };

    

    form = React.createRef();

  


    render()
    {
        const {classes} = this.props;

        return (
         
            
            <div className={classNames(classes.root, "flex flex-col flex-1 flex-no-shrink p-24 md:flex-row md:p-0")}>

                <div className="flex flex-col flex-no-grow items-center text-white p-16 text-center md:p-128 md:items-start md:flex-no-shrink md:flex-1 md:text-left">

                    <FuseAnimate animation="transition.slideUpIn" delay={300}>
                        <Typography variant="h3" color="inherit" className="font-light">
                            Welcome to 
                        </Typography>
                    </FuseAnimate>

                    <FuseAnimate animation="transition.expandIn">
                        <img className="w-370 mb-120" src="assets/images/logos/market-connect.png" alt="logo"/>
                    </FuseAnimate>                  
                </div>

                              
            </div>            
            
        )
    }
}




export default withStyles(styles, {withTheme: true})(withRouter(Welcome));
