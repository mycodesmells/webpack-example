function Person(data) {

    this.getFullName = function () {
        return data.firstName + " " + data.lastName;
    };

    this.isAdult = function () {
        return data.age >= 18;
    };

}

module.exports = Person;