export class PermissionContext {
  userPermissions: string[];
  memberPermissions: string[];
  channelPermissions: string[];
  constructor(user: any, member: any, channel: any) {
    this.userPermissions = user.permissions?.toArray() || [];
    this.memberPermissions = member?.permissions?.toArray() || [];
    this.channelPermissions = channel?.permissionsFor?.(user)?.toArray() || [];
  }
  has(perm: string) {
    return this.userPermissions.includes(perm)
      || this.memberPermissions.includes(perm)
      || this.channelPermissions.includes(perm);
  }
}