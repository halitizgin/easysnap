const Query = require('./queries/Query');
const Snap = require('./queries/Snap');
const User = require('./queries/User');

const Mutation = require('./mutations');

module.exports = {
    Query,
    Snap,
    User,
    Mutation,
    Subscription: {
        sayi: {
            subscribe: (parent, args, { pubsub }) => {
                let sayi = 5;

                setInterval(() => {
                    sayi += 1;
                    pubsub.publish('sayi', {
                        sayi
                    });
                }, 3000)
                return pubsub.asyncIterator('sayi');
            }
        }
    }
};