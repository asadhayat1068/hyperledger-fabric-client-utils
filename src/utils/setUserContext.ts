import getLogger  from './logger';

const logger = getLogger('fabric/setUserContext');

export default function setUserContext(fabricClient, userId) {
    return Promise.resolve()
        .then(() => {
            // get the enrolled user from persistence, this user will sign all requests
            return fabricClient.getUserContext(userId, true);
        })
        .then((userFromStore) => {
            if (userFromStore && userFromStore.isEnrolled()) {
                logger.info(`Successfully loaded ${userId} from persistence`);
            } else {
                throw new Error(`Unable to load ${userId} as it's not been registered`);
            }

            return userFromStore;
        });
};