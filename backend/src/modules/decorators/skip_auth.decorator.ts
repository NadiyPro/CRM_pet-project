import { SetMetadata } from '@nestjs/common';

export const SKIP_AUTH = 'SKIP_AUTH';
export const SkipAuth = () => SetMetadata(SKIP_AUTH, true);
// ми створюємо кастомний декоратор SkipAuth
// таким чином коли ми будемо викликати через декоратор нашу функцію @SkipAuth()
// в нас в метадані буде записуватись, що SKIP_AUTH = true, далі в
// У jwt_access.guard.ts та jwt_refresh.guard.ts ми читаємо цю метадані
// якщо SKIP_AUTH = true, то дозволяємо доступ до ендпоінта без авторизації
