const Microservice = require('@joinbox/loopback-microservice');

const { LoopbackModelBase } = Microservice;

class DummyModel extends LoopbackModelBase {
    constructor({ model }) {
        super({ model });
    }
}

module.exports = function(model) {
    return new DummyModel({ model });
};
