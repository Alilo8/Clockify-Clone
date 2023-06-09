import logo from './logo.svg';
import menuIcon from './menuIcon.svg';
import help from './help.svg';
import notification from './notification.svg';
import plus_blue from './plus_blue.svg';
import playButton from './playButton.svg';
import deleteIcon from './deleteIcon.svg';
import close_icon from './close_icon.svg';

import time_tracker from './time_tracker.svg';
import calendar from './calendar.svg';
import dashboard from './dashboard.svg';
import projects from './projects.svg';
import clients from './clients.svg';
import tags from './tags.svg';
import settings from './settings.svg';

export{
    logo,
    menuIcon,
    help,
    notification,
    plus_blue,
    playButton,
    deleteIcon,
    close_icon
};

export const SidebarData = [
    {
        name: 'TIME TRACKER',
        icon: time_tracker,
        link: '/tracker'
    },
    {
        name: 'CALENDAR',
        icon: calendar,
        link: '/calendar'
    },
    {
        name: 'DASHBOARD',
        icon: dashboard,
        link: '/dashboard'
    },
    {
        name: 'PROJECTS',
        icon: projects,
        link: '/projects'
    },
    {
        name: 'CLIENTS',
        icon: clients,
        link: '/clients'
    },
    {
        name: 'TAGS',
        icon: tags,
        link: '/tags'
    },
    {
        name: 'SETTINGS',
        icon: settings,
        link: '/settings'
    },
]