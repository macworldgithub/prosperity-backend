import { Injectable } from '@nestjs/common';
interface State {
  name: string;
  code: string;
}

@Injectable()
export class StatesService {
  private states: State[] = [];

  addAustralianStates(): State[] {
    this.states = [
      { name: 'New South Wales', code: 'NSW' },
      { name: 'Victoria', code: 'VIC' },
      { name: 'Queensland', code: 'QLD' },
      { name: 'South Australia', code: 'SA' },
      { name: 'Western Australia', code: 'WA' },
      { name: 'Tasmania', code: 'TAS' },
      { name: 'Australian Capital Territory', code: 'ACT' },
      { name: 'Northern Territory', code: 'NT' },
    ];

    return this.states;
  }

  getAllStates(): State[] {
    return this.states;
  }
}
