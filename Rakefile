require "crxmake"

task :default => [:compile]

task :compile do
  pem = "~/.pem/prose-this.pem"
  
  CrxMake.make(
    :ex_dir => "./src",
    :pkey   => pem,
    :crx_output => "./package/prose-this.crx",
    :verbose => true,
    :ignorefile => /\.swp/,
    :ignoredir => /\.(?:svn|git|cvs)/
  )
end