import React, {Component} from 'react';
import {AppBar, Card, CardContent, Icon, Tooltip, Toolbar, Typography} from '@material-ui/core';
import {FuseAnimateGroup} from '@fuse';
import { connect } from 'react-redux'
import axios from 'axios';
import GoogleMap from 'google-map-react';
import { serviceApiUrl } from 'app/config';

function Marker({text})
{
    return (
        <Tooltip title={text} placement="top">
            <Icon className="text-red">place</Icon>
        </Tooltip>
    );
}

class AboutTab extends Component {

    state = {
        general: null,
        work   : null,
        contact: null,
        groups : null,
        friends: null,
        defaultLocation:{
            lat:23.5880,
            lng:58.3829
        },
        addressLocation:{   lat:23.5880,
                            lng:58.3829
        },
    };

    componentDidMount()
    {
        const { user } = this.props;

        if(user){
            this.props.setUserInfo(user)
            axios.get(serviceApiUrl + '/sme/'+ user._id).then(res => {
                console.log("profile", res);
                this.setState({user:res.data});
            });
        }
    }

 

    render()
    {
        const { user } = this.state;
        return (
            <div className="md:flex max-w-2xl">

                <div className="flex flex-col flex-1 md:pr-32">
                    <FuseAnimateGroup
                        enter={{
                            animation: "transition.slideUpBigIn"
                        }}
                    >
                        { user && (
                            <Card className="w-full mb-16">
                                <AppBar position="static" elevation={0}>
                                    <Toolbar className="pl-16 pr-8">
                                        <Typography variant="subtitle1" color="inherit" className="flex-1">
                                            General Information
                                        </Typography>
                                    </Toolbar>
                                </AppBar>

                                <CardContent>
                                    <div className="mb-24">
                                        <Typography className="font-bold mb-4 text-15">User Name</Typography>
                                        <Typography>{user.userName}</Typography>
                                    </div>

                                    <div className="mb-24">
                                        <Typography className="font-bold mb-4 text-15">Email</Typography>
                                        <Typography>{user.email}</Typography>
                                    </div>

                                    <div className="mb-24">
                                        <Typography className="font-bold mb-4 text-15">Company registration Name</Typography>
                                        <Typography>{user.smeName}</Typography>
                                    </div>

                                    <div className="mb-24">
                                        <Typography className="font-bold mb-4 text-15">Company registration Number</Typography>
                                        <Typography>{user.cr}</Typography>
                                    </div>

                                    <div className="mb-24">
                                        <Typography className="font-bold mb-4 text-15">Company registration Date</Typography>
                                        <Typography>{user.registrationDate?user.registrationDate.split('T')[0]:''}</Typography>
                                    </div>

                                    <div className="mb-24">
                                        <Typography className="font-bold mb-4 text-15">OAB Account Number</Typography>
                                        <Typography>{user.oabCustomerNumber}</Typography>
                                    </div>

                                    <div className="mb-24">
                                        <Typography className="font-bold mb-4 text-15">Mobile Number</Typography>
                                        <Typography>{user.mobile}</Typography>
                                    </div>

                                    { this.props.user && this.props.user.role === 'sme' && 
                                    <div style={{ display:'contents' }}>
                                    <div className="mb-24">
                                        <Typography className="font-bold mb-4 text-15">Address 1</Typography>
                                        <Typography>{user.address1 }</Typography>
                                    </div>

                                    <div className="mb-24">
                                        <Typography className="font-bold mb-4 text-15">Address 2</Typography>
                                        <Typography>{user.address2 }</Typography>
                                    </div>

                                    <div className="mb-24">
                                        <Typography className="font-bold mb-4 text-15">City</Typography>
                                        <Typography>{user.city }</Typography>                                       
                                    </div>

                                    <div className="mb-24">
                                        <Typography className="font-bold mb-4 text-15">Post Code</Typography>
                                        <Typography>{user.postCode }</Typography>                                       
                                    </div>

                                    <div className="mb-24">
                                        <Typography className="font-bold mb-4 text-15">Website</Typography>
                                        <Typography>{user.website }</Typography>                                       
                                    </div>                                   

                                    <div className="mb-24">
                                        <Typography className="font-bold mb-4 text-15">Company Profile</Typography>
                                        <Typography>{user.companyprofile}</Typography>
                                    </div>
                                    <div className="mb-24">
                                        <Typography className="font-bold mb-4 text-15">Address on Map</Typography>                                        
                                    </div>

                                    <div className="md-24" style={{ height:'500px' }}>                                     
                                        <GoogleMap
                                            bootstrapURLKeys={{
                                                key: 'AIzaSyDqtvJeZ4Qok8vZ61cYYUUb0sgnFMZZz-Q'
                                            }}
                                            defaultZoom={12}
                                            defaultCenter={ (!user.locationX && !user.locationY)? this.state.defaultLocation:
                                                { lat: user.locationX, lng:user.locationY}
                                            }                                           
                                        >
                                            <Marker
                                                text="Selected Location is the adderess of seller"
                                                lat={ (user.locationX)? user.locationX: this.state.addressLocation.lat }
                                                lng={ (user.locationY)? user.locationY: this.state.addressLocation.lng }
                                            />
                                        </GoogleMap>                            
                                    </div>
                                    </div>
                                    }
                                </CardContent>
                            </Card>
                        )}
                    </FuseAnimateGroup>
                </div>        
            </div>
        );
    }
}

const matachStateToProps = ({ auth }) => {
    return {
        user:auth.user
    }
}

export default connect(matachStateToProps,null)(AboutTab);
