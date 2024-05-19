export function checkUUID(uuid: string): boolean {
  const regexExp =
    /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i;
  return regexExp.test(uuid);
}
