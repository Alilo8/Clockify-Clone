import logo from './logo.svg';
import menuIcon from './menuIcon.svg';
import help from './help.svg';
import notification from './notification.svg';
import plus_blue from './plus_blue.svg';
import playButton from './playButton.svg';
import pauseButton from './pauseButton.svg';
import deleteIcon from './deleteIcon.svg';
import close_icon from './close_icon.svg';
import search_icon from './search_icon.svg';
import logout_icon from './logout_icon.svg';

import time_tracker from './time_tracker.svg';
import calendar from './calendar.svg';
import dashboard from './dashboard.svg';
import projects from './projects.svg';
import clients from './clients.svg';
import tags from './tags.svg';
import settings from './settings.svg';
import dropdownIcon from './dropdownIcon.svg';

export{
    logo,
    menuIcon,
    help,
    notification,
    plus_blue,
    playButton,
    pauseButton,
    deleteIcon,
    close_icon,
    search_icon,
    dropdownIcon,
    logout_icon,
};

export const SidebarData = [
    {
        name: 'TIME TRACKER',
        icon: time_tracker,
        link: '/'
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
        name: 'TEAM',
        icon: clients,
        link: '/clients'
    },
    {
        name: 'REPORT',
        icon: tags,
        link: '/tags'
    },
    {
        name: 'SETTINGS',
        icon: settings,
        link: '/settings'
    },
]