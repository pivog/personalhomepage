export default class Tense {
    constructor(suffixes = [["", "", "", "", "", ""],["", "", "", "", "", ""],["", "", "", "", "", ""],["", "", "", "", "", ""]]) {
        self.suffixes = suffixes
    }

    getPresentBase(word) {
        let conujugation = parseInt(word.split(" ")[1][0])-1
        switch (conujugation) {
            case 0:
                return (word.split(" ")[0]).slice(0, -1)
            case 1:
                return (word.split(" ")[0]).slice(0, -1)
            case 2:
                return (word.split(" ")[0]).slice(0, -1)
            case 3:
                return (word.split(" ")[0]).slice(0, -1)
        }
    }

    getVariation(word, variation) {
        let conjugation = parseInt(word.split(" ")[1][0])-1
        console.log(self.suffixes[conjugation][variation])
        return this.getPresentBase(word) + self.suffixes[conjugation][variation]
    }
}