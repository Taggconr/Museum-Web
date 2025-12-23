import type { NextConfig } from "next";


const nextConfig: NextConfig = {
  reactCompiler: true,

  // Настройка для статического экспорта (размещение как архив/файлы)
  output: 'export',

  // Отключаем оптимизацию изображений при экспорте (если нужны исходные файлы)
  images: {
    unoptimized: true,
  },

  // Если нужно задать базовый путь (например, при размещении в подпапке)
  // basePath: '/my-app',

  // Опционально: настройка путей к статическим ресурсам
  // assetPrefix: '/my-app/',
};

export default nextConfig;
