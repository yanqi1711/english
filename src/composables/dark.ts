export function useAppDark() {
  const isDark = useDark()
  const toggleDark = useToggle(isDark)

  return {
    isDark: readonly(isDark),
    toggleDark,
  }
}
