function Person(data) {

    this.getFullName = () => {
        return data.firstName + " " + data.lastName;
    };

    this.isAdult = () => {
        return data.age >= 18;
    };

}

module.exports = Person;