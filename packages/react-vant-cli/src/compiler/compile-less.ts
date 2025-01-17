import less from 'less';
import fse from 'fs-extra';

const { readFileSync } = fse;
const { render, FileManager } = less;

// less plugin to resolve tilde
class TildeResolver extends FileManager {
  loadFile(filename: string, ...args: any[]) {
    filename = filename.replace('~', '');
    return FileManager.prototype.loadFile.apply(this, [filename, ...args]);
  }
}

const TildeResolverPlugin = {
  install(lessInstance: unknown, pluginManager: any) {
    pluginManager.addFileManager(new TildeResolver());
  },
};

export async function compileLess(filePath: string) {
  const source = readFileSync(filePath, 'utf-8');
  const { css } = await render(source, {
    filename: filePath,
    plugins: [TildeResolverPlugin],
  });

  return css;
}
