import Realm, {BSON} from 'realm';
import LineItem from './LineItem';

export default class Space extends Realm.Object<Space> {
  _id!: string;
  name: string;
  isSecret: boolean;
  color: string;
  icon?: number;
  lineItems: Realm.List<LineItem>;

  static schema = {
    name: 'Space',
    properties: {
      _id: {type: 'string', default: () => new BSON.ObjectID().toString()},
      name: {type: 'string', indexed: true},
      isSecret: {type: 'bool'},
      color: {type: 'string'},
      icon: {type: 'int?'},
      lineItems: {type: 'list', objectType: 'LineItem'},
    },
    primaryKey: '_id',
  };

  static generate(
    name: string,
    isSecret: boolean,
    color: string,
    icon?: number,
  ) {
    return {
      _id: new BSON.ObjectID().toString(),
      isSecret,
      name,
      color,
      icon,
    };
  }

  constructor(
    realm: Realm,
    name: string,
    isSecret: boolean,
    color: string,
    icon?: number,
  ) {
    super(realm, {
      _id: new BSON.ObjectID().toString(),
      name,
      isSecret,
      color,
      icon,
    });
  }
}
