/**
 * @overload
 */
declare function isString(value: unknown): value is string;
/**
 * @overload
 */
declare function isString(value: unknown): boolean;
/**
 * @overload
 */
declare function isNotString<T>(value: T): value is Exclude<T, string>;
/**
 * @overload
 */
declare function isNotString(value: unknown): boolean;
/**
 * @overload
 */
declare function isNumber(value: unknown): value is number;
/**
 * @overload
 */
declare function isNumber(value: unknown): boolean;
/**
 * @overload
 */
declare function isNotNumber<T>(value: T): value is Exclude<T, number>;
/**
 * @overload
 */
declare function isNotNumber(value: unknown): boolean;
/**
 * @overload
 */
declare function isBoolean(value: unknown): value is boolean;
/**
 * @overload
 */
declare function isBoolean(value: unknown): boolean;
/**
 * @overload
 */
declare function isNotBoolean<T>(value: T): value is Exclude<T, boolean>;
/**
 * @overload
 */
declare function isNotBoolean(value: unknown): boolean;
/**
 * @overload
 */
declare function isUndefined(value: unknown): value is undefined;
/**
 * @overload
 */
declare function isUndefined(value: unknown): boolean;
/**
 * @overload
 */
declare function isNotUndefined<T>(value: T): value is Exclude<T, undefined>;
/**
 * @overload
 */
declare function isNotUndefined(value: unknown): boolean;
/**
 * @overload
 */
declare function isDefined<T>(value: T): value is Exclude<T, undefined>;
/**
 * @overload
 */
declare function isDefined(value: unknown): boolean;
/**
 * @overload
 */
declare function isObjectPlain(value: unknown): value is Record<string, unknown>;
/**
 * @overload
 */
declare function isObjectPlain(value: unknown): boolean;
/**
 * @overload
 */
declare function isObjectStrict(value: unknown): value is Record<string, unknown>;
/**
 * @overload
 */
declare function isObjectStrict(value: unknown): boolean;
/**
 * @overload
 */
declare function isObjectLoose(value: unknown): value is object;
/**
 * @overload
 */
declare function isObjectLoose(value: unknown): boolean;
type ClassCtor<T = any> = new (...args: any[]) => T;
/**
 * @overload
 */
declare function isClass(value: unknown): value is ClassCtor;
/**
 * @overload
 */
declare function isClass(value: unknown): boolean;
/**
 * A union of standard JavaScript **constructable** built-ins
 * (e.g., `Object`, `Array`, `Date`, `Map`, etc.).
 */
type BuiltInConstructor = ObjectConstructor | ArrayConstructor | FunctionConstructor | StringConstructor | NumberConstructor | BooleanConstructor | DateConstructor | RegExpConstructor | ErrorConstructor | EvalErrorConstructor | RangeErrorConstructor | ReferenceErrorConstructor | SyntaxErrorConstructor | TypeErrorConstructor | URIErrorConstructor | MapConstructor | WeakMapConstructor | SetConstructor | WeakSetConstructor | PromiseConstructor;
/**
 * @overload
 */
declare function isBuiltInConstructor(value: unknown): value is BuiltInConstructor;
/**
 * @overload
 */
declare function isBuiltInConstructor(value: unknown): boolean;
/**
 * Built-in globals that are **callable**:
 * - All standard constructors (above)
 * - Plus callable, **non-constructable** built-ins: `BigInt` and `Symbol`
 */
type BuiltInCallable = BuiltInConstructor | typeof BigInt | typeof Symbol;
/**
 * @overload
 */
declare function isBuiltInCallable(value: unknown): value is BuiltInCallable;
/**
 * @overload
 */
declare function isBuiltInCallable(value: unknown): boolean;
/**
 * @overload
 */
declare function isInstanceOfUnknownClass(value: unknown): value is object;
/**
 * @overload
 */
declare function isInstanceOfUnknownClass(value: unknown): boolean;

export { isBoolean, isBuiltInCallable, isBuiltInConstructor, isClass, isDefined, isInstanceOfUnknownClass, isNotBoolean, isNotNumber, isNotString, isNotUndefined, isNumber, isObjectLoose, isObjectPlain, isObjectStrict, isString, isUndefined };
export type { BuiltInCallable, BuiltInConstructor };
