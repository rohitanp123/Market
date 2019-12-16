import React, {Component} from 'react';
import {withStyles, Button, Tab, Tabs, Typography} from '@material-ui/core';
import {FusePageSimple, FuseAnimate} from '@fuse';
import AboutTab from './tabs/AboutTab';

const styles = theme => ({
    layoutHeader : {
        height                        : 180,
        minHeight                     : 180,
        [theme.breakpoints.down('md')]: {
            height   : 180,
            minHeight: 180
        }
    }
});

class ProfilePage extends Component {

    state = {
        value: 0
    };

    handleChange = (event, value) => {
        this.setState({value});
    };

    handleEditClick = () => {
        this.props.history.push('/pages/profile/edit/' + this.state.user._id);
    }

    setUserInfo = (user) => {
        this.setState({ user })
        console.log(user);
    }

    render()
    {
        const {classes} = this.props;
        const {value} = this.state;

        return (
            <FusePageSimple
                classes={{
                    header : classes.layoutHeader,
                    toolbar: "px-16 sm:px-24"
                }}
                header={
                    <div className="p-24 flex flex-1 flex-col items-center justify-center md:flex-row md:items-end" dir="rtl">
                        <div className="flex flex-1 flex-col items-center justify-center md:flex-row md:items-center md:justify-start">
                            <FuseAnimate animation="transition.slideLeftIn" delay={300}>
                                <Typography className="md:ml-24" variant="h4" color="inherit">My Profile</Typography>
                            </FuseAnimate>
                        </div>
                        <div className="flex items-center justify-end">
                            <Button className="mr-8 normal-case" variant="contained" color="secondary" aria-label="Follow" onClick={ () => { this.handleEditClick() } }>Edit</Button>
                        </div>
                    </div>
                }
                
                contentToolbar={
                    <Tabs
                        value={value}
                        onChange={this.handleChange}
                        indicatorColor="secondary"
                        textColor="secondary"
                        variant="scrollable"
                        scrollButtons="off"
                        classes={{
                            root: "h-64 w-full border-b-1"
                        }}
                        dir="rtl"
                    >
                       
                        <Tab
                            classes={{
                                root: "h-64"
                            }} label="About"

                        />
                      
                    </Tabs>
                }
                content={
                    <div className="p-16 sm:p-24" dir="rtl">                        
                        {value === 0 && (
                            <AboutTab setUserInfo={ this.setUserInfo }/>
                        )}                       
                    </div>
                }
            />
        )
    };
}

export default withStyles(styles, {withTheme: true})(ProfilePage);
