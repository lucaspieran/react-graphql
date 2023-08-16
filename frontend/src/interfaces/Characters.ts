interface Character {
  name: string;
  status: string;
  species: string;
  gender: string;
}

export interface QueryResponse {
  humanCharacters: Character[];
}
