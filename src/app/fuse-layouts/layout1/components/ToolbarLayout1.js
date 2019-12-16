import React from 'react';
import {AppBar, Hidden, MuiThemeProvider, Toolbar, withStyles} from '@material-ui/core';
import connect from 'react-redux/es/connect/connect';
import {withRouter} from 'react-router-dom';
import NavbarMobileToggleButton from 'app/fuse-layouts/shared-components/NavbarMobileToggleButton';
import UserMenu from 'app/fuse-layouts/shared-components/UserMenu';
import { buyersiteurl } from '../../../main/apps/config';

const styles = theme => ({
    separator: {
        width          : 1,
        height         : 64,
        backgroundColor: theme.palette.divider
    }
});

const ToolbarLayout1 = ({classes, settings, toolbarTheme}) => {

    const layoutConfig = settings.layout.config;

    return (
        <MuiThemeProvider theme={toolbarTheme}>
            <AppBar id="fuse-toolbar" className="flex relative z-10" color="default" dir={layoutConfig.navbar.position === 'right' ? 'rtl':'rtl'}>
                <Toolbar className="p-0">

                    {layoutConfig.navbar.display && layoutConfig.navbar.position === 'left' && (
                        <Hidden lgUp>
                            <NavbarMobileToggleButton className="w-64 h-64 p-0"/>
                            <div className={classes.separator}/>
                        </Hidden>
                    )}

                    <div className="flex flex-1">
                        {/* <Hidden mdDown>
                            <FuseShortcuts className="px-16"/>
                        </Hidden> */}
                    </div>

                    <div style={{display:'block'}} >
                            <a href={ buyersiteurl }>M-Connect</a>

                        <UserMenu/>
                       
                    </div>

                    {layoutConfig.navbar.display && layoutConfig.navbar.position === 'right' && (
                        <Hidden lgUp>
                            <NavbarMobileToggleButton/>
                        </Hidden>
                    )}
                </Toolbar>
            </AppBar>
        </MuiThemeProvider>
    );
};

function mapStateToProps({fuse})
{
    return {
        settings    : fuse.settings.current,
        toolbarTheme: fuse.settings.toolbarTheme
    }
}

export default withStyles(styles, {withTheme: true})(withRouter(connect(mapStateToProps)(ToolbarLayout1)));
