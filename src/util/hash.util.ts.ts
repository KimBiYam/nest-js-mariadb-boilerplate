import * as bcrypt from 'bcrypt';

export class HashUtil {
  static make(plainText: string) {
    const salt = bcrypt.genSaltSync();
    return bcrypt.hashSync(plainText, salt);
  }

  static compare(plainText: string, hash: string) {
    return bcrypt.compareSync(plainText, hash);
  }
}
