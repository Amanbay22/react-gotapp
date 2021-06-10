export default class GotService{
    constructor() {
        this._apiBase = 'https://www.anapioficeandfire.com/api';
    }

    async getResource(url) {
        const res = await fetch(`${this._apiBase}${url}`);

        if(!res.ok) {
            throw new Error(`Could not fetch ${url}` +
            `, received ${res.status}`);
        }
        return await res.json();
    }

    async  getAllCharacters() {
        const res = await this.getResource(`/characters?page=5&pageSize=10`);
        return res.map(this._transformCharacter)
    }

    async getCharacter(id) {
         const res = await this.getResource(`/characters/${id}`);
         return this._transformCharacter(res);
    }
    _transformCharacter(char){
        return {
                name: char.name? char.name:'no-data:(',
                gender: char.gender? char.gender:'no-data:(',
                born: char.born? char.born:'no-data:(',
                died: char.died?char.died:'no-data:(',
                culture: char.culture?char.culture:'no-data:(',
                id: parseInt(char.url.match(/\d+/))
        }
    }

    
}

