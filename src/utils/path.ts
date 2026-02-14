export const getPath = (path: string) => {
    const isProd = process.env.NODE_ENV === 'production';
    const prefix = isProd ? '/movie-mania' : '';
    return `${prefix}${path}`;
};