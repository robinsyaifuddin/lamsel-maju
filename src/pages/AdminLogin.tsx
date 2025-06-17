import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { toast } from "sonner";
import { Eye, EyeOff, LogIn, ArrowLeft, HelpCircle, UserPlus } from 'lucide-react';
import { 
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { authService } from '@/services/authService';

const AdminLogin = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [showForgotPasswordDialog, setShowForgotPasswordDialog] = useState(false);
  const [resetEmail, setResetEmail] = useState('');
  const [resetLoading, setResetLoading] = useState(false);
  const navigate = useNavigate();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      const result = await authService.login({ username, password });
      
      if (result.success) {
        toast.success(result.message);
        // Navigate based on user role
        if (result.user.role === 'central') {
          navigate('/admin/dashboard');
        } else {
          navigate('/admin/umkm');
        }
      } else {
        toast.error(result.message);
      }
    } catch (error) {
      toast.error('Terjadi kesalahan saat login!');
    } finally {
      setIsLoading(false);
    }
  };

  const handleResetPassword = (e: React.FormEvent) => {
    e.preventDefault();
    setResetLoading(true);
    
    // Simulate password reset email
    setTimeout(() => {
      toast.success(`Instruksi reset password telah dikirim ke ${resetEmail}`);
      setResetLoading(false);
      setShowForgotPasswordDialog(false);
      setResetEmail('');
    }, 1500);
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-50 to-slate-100 flex flex-col justify-center items-center p-4">
      <div className="absolute top-4 left-4">
        <Button 
          variant="ghost" 
          size="sm" 
          className="flex items-center gap-2 text-gray-600 hover:text-gray-900"
          onClick={() => navigate('/')}
        >
          <ArrowLeft size={16} />
          Kembali ke Beranda
        </Button>
      </div>

      <div className="w-full max-w-md">
        <Card className="shadow-[0_10px_20px_rgba(0,0,0,0.1)] border-0 card-3d-content transform transition-all duration-300 hover:translate-y-[-5px] hover:shadow-[0_20px_40px_rgba(0,0,0,0.15)]">
          <CardHeader className="space-y-1 text-center bg-gradient-to-r from-lamsel-blue to-blue-500 text-white rounded-t-lg p-8 relative overflow-hidden">
            <div className="absolute inset-0 bg-[url('/path/to/pattern.svg')] opacity-10 mix-blend-overlay"></div>
            <div className="relative z-10">
              <CardTitle className="text-3xl font-bold">Portal Admin</CardTitle>
              <CardDescription className="text-gray-100 mt-2">
                Masuk untuk mengelola sistem
              </CardDescription>
            </div>
          </CardHeader>
          <CardContent className="pt-6 px-8">
            <form onSubmit={handleLogin}>
              <div className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="username" className="text-sm font-medium">Username</Label>
                  <Input
                    id="username"
                    placeholder="Masukkan username admin"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    required
                    autoComplete="username"
                    className="button-3d shadow-sm border-gray-200 focus:border-blue-400 focus:ring-2 focus:ring-blue-50"
                  />
                </div>
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <Label htmlFor="password" className="text-sm font-medium">Password</Label>
                    <Button 
                      type="button" 
                      variant="link" 
                      className="text-xs p-0 h-auto text-gray-500 hover:text-lamsel-blue"
                      onClick={() => setShowForgotPasswordDialog(true)}
                    >
                      Lupa Password?
                    </Button>
                  </div>
                  <div className="relative">
                    <Input
                      id="password"
                      type={showPassword ? "text" : "password"}
                      placeholder="Masukkan password"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      required
                      autoComplete="current-password"
                      className="pr-10 button-3d shadow-sm border-gray-200 focus:border-blue-400 focus:ring-2 focus:ring-blue-50"
                    />
                    <button
                      type="button"
                      className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-gray-700"
                      onClick={() => setShowPassword(!showPassword)}
                    >
                      {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                    </button>
                  </div>
                </div>
                <Button
                  type="submit"
                  className="w-full bg-lamsel-blue hover:bg-blue-600 button-3d shadow-md transition-all duration-300 transform hover:translate-y-[-2px] hover:shadow-lg"
                  disabled={isLoading}
                >
                  {isLoading ? (
                    <span className="flex items-center justify-center">
                      <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                      </svg>
                      Memproses...
                    </span>
                  ) : (
                    <span className="flex items-center justify-center">
                      <LogIn className="mr-2" size={18} />
                      Login
                    </span>
                  )}
                </Button>
              </div>
            </form>
          </CardContent>
          <CardFooter className="border-t py-4 px-8 text-center">
            <div className="w-full flex flex-col items-center">
              <p className="text-sm text-muted-foreground mb-3">Belum punya akun pengelola UMKM?</p>
              <Button 
                variant="outline" 
                className="w-full flex items-center justify-center gap-2 border-lamsel-blue text-lamsel-blue hover:bg-lamsel-blue hover:text-white" 
                onClick={() => navigate('/admin/register')}
              >
                <UserPlus size={16} />
                Daftar sebagai Pengelola UMKM
              </Button>
            </div>
          </CardFooter>
        </Card>
        
        <div className="text-center mt-6 text-gray-500 text-sm">
          Administrator system. Gunakan kredensial yang diberikan oleh pihak berwenang.
        </div>
      </div>

      {/* Forgot Password Dialog */}
      <Dialog open={showForgotPasswordDialog} onOpenChange={setShowForgotPasswordDialog}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>Reset Password</DialogTitle>
            <DialogDescription>
              Masukkan email yang terkait dengan akun Anda. Kami akan mengirimkan instruksi reset password.
            </DialogDescription>
          </DialogHeader>
          <form onSubmit={handleResetPassword} className="py-4">
            <div className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  placeholder="nama@email.com"
                  type="email"
                  value={resetEmail}
                  onChange={(e) => setResetEmail(e.target.value)}
                  required
                />
              </div>
            </div>
            <DialogFooter className="mt-6">
              <Button 
                type="button" 
                variant="outline" 
                onClick={() => setShowForgotPasswordDialog(false)}
              >
                Batal
              </Button>
              <Button type="submit" disabled={resetLoading}>
                {resetLoading ? (
                  <span className="flex items-center">
                    <svg className="animate-spin -ml-1 mr-2 h-4 w-4" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    Memproses...
                  </span>
                ) : (
                  <span className="flex items-center">
                    <HelpCircle className="mr-2" size={16} />
                    Kirim Instruksi
                  </span>
                )}
              </Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default AdminLogin;
