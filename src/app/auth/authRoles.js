/**
 * Authorization Roles
 */
const authRoles = {
    admin    : ['admin'],
    staff    : ['admin', 'staff'],
    user     : ['admin', 'staff', 'user'],
    onlyGuest: ['guest'],
    sme      : ['sme','admin'],
    rm       : ['rm','sme','admin']   
};

export default authRoles;
