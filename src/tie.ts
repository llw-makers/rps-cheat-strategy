import { RPSStrategyMove, RPSTurn } from 'rps-stuff';
import { CheatStrategy, CheatStrategyContext, wait } from './cheat';

export class TieStrategy extends CheatStrategy {
  async decideMove(turns: RPSTurn[]): Promise<RPSStrategyMove<CheatStrategyContext>> {
    await wait(this.timeout);
    console.log("Deciding move now");
    let guess = this.server.getBestGuess();
    if (guess) {
      return {action: guess, data: {isCheat: true, didGuess: true, guessedAction: guess}};
    } else {
      return {action: this.fallback.decideMove(turns).action, data: {isCheat: true, didGuess: false}};
    }
  }
}
