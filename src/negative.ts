import { RPSStrategyMove, RPSAction, RPSTurn } from 'rps-stuff';
import { CheatStrategy, CheatStrategyContext, wait } from './cheat';

export class NegativeStrategy extends CheatStrategy {
  async decideMove(turns: RPSTurn[]): Promise<RPSStrategyMove<CheatStrategyContext>> {
    await wait(this.timeout);
    console.log("Deciding move now");
    switch (this.server.getBestGuess()) {
      case RPSAction.Rock:
        return {action: RPSAction.Scissors, data: {isCheat: true, didGuess: true, guessedAction: RPSAction.Rock}};
      case RPSAction.Paper:
        return {action: RPSAction.Rock, data: {isCheat: true, didGuess: true, guessedAction: RPSAction.Paper}};
      case RPSAction.Scissors:
        return {action: RPSAction.Paper, data: {isCheat: true, didGuess: true, guessedAction: RPSAction.Scissors}};
      default:
        return {action: this.fallback.decideMove(turns).action, data: {isCheat: true, didGuess: false}};
    }
  }
}
