import { EventConfig } from './user-event.config';

export const UserDashboardDetails = {
    eventDetails: [{
        ...EventConfig.LIKE,
        action: `../events/${EventConfig.LIKE.id}`,
        body: '0/0'
    }, {
        ...EventConfig.COMMENT,
        action: `../events/${EventConfig.COMMENT.id}`,
        body: '0/0'
    }, {
        ...EventConfig.FAV,
        action: `../events/${EventConfig.FAV.id}`,
        body: '0/0'
    }]
}