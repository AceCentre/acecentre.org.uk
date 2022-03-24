import { theme, isChakraTheme } from "@chakra-ui/theme";
import { isFunction, pipe, mergeWith } from "@chakra-ui/utils";

function mergeThemeOverride(...overrides) {
  return mergeWith({}, ...overrides, mergeThemeCustomizer);
}

function mergeThemeCustomizer(source, override, key, object) {
  if (
    (isFunction(source) || isFunction(override)) &&
    Object.prototype.hasOwnProperty.call(object, key)
  ) {
    return (...args) => {
      const sourceValue = isFunction(source) ? source(...args) : source;

      const overrideValue = isFunction(override) ? override(...args) : override;

      return mergeWith({}, sourceValue, overrideValue, mergeThemeCustomizer);
    };
  }

  // fallback to default behaviour
  return undefined;
}

export function extendTheme(...extensions) {
  let overrides = [...extensions];
  let baseTheme = extensions[extensions.length - 1];

  if (
    isChakraTheme(baseTheme) &&
    // this ensures backward compatibility
    // previously only `extendTheme(override, baseTheme?)` was allowed
    overrides.length > 1
  ) {
    overrides = overrides.slice(0, overrides.length - 1);
  } else {
    baseTheme = theme;
  }

  return pipe(
    ...overrides.map(
      (extension) => (prevTheme) =>
        isFunction(extension)
          ? extension(prevTheme)
          : mergeThemeOverride(prevTheme, extension)
    )
  )(baseTheme);
}
