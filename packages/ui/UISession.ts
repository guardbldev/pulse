/*
 *
 * PulseCommand: UI Session & State Manager
 * ----------------------------------------
 * - Handles per-user persistent UI state (pagination, modals, etc)
 * - Supports timeouts, expiry cleanup, multi-session
 *
 * @file UISession.ts
 *
 */

type UIDestroy = () => void;

/*
 *
 * Represents a single user's UI session (step/page/form/any state)
 * - `state` is a shallow KV store for anything (page, data...)
 * - Destroys self on expiry for memory safety
 *
 */
export class UISession {
  state: any;
  destroy: UIDestroy;

  private _timer: ReturnType<typeof setTimeout>|null = null;

  constructor(public userId: string, public ttlSec=300) {
    this.state = {};
    this.destroy = () => {};
    this._timer = setTimeout(() => this.destroy(), ttlSec*1000);
  }
  set(key: string, val: any) { this.state[key] = val; }
  get(key: string) { return this.state[key]; }
  clearTimeout() { if (this._timer) clearTimeout(this._timer); }
}

/*
 *
 * UISessionManager
 * - Handles multiple user sessions (for multi-user bots, DMs, etc)
 * - Can be extended for DB or cluster persistence
 *
 */
export class UISessionManager {
  private sessions: Map<string, UISession> = new Map();

  create(userId: string, ttl=300) {
    const s = new UISession(userId, ttl);
    s.destroy = () => this.sessions.delete(userId);
    this.sessions.set(userId, s);
    return s;
  }
  get(userId: string) { return this.sessions.get(userId); }
  cleanup() {
    for (const [user, sess] of this.sessions)
      if (!sess._timer) sess.destroy();
  }
}