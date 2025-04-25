import { SetMetadata } from '@nestjs/common';

export const SKIP_AUTH = 'SKIP_AUTH';
export const SkipAuth = () => SetMetadata(SKIP_AUTH, true);
// @SkipAuth() - це наш кастомний декоратор
// використовується над кожним ендпоінтом,
// де потрібно пропускати використання нашого клобального guards,
// тобто ми приходимо на потрібний нам ендпоінт і там до тих даних що нам приходять,
// додаються ще метадані SetMetadata(SKIP_AUTH, true)
// і ми робимо метод доступний без аутентифікації.
// SKIP_AUTH — це константа, яка зберігає назву метаданих.
