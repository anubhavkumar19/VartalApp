const AuthImagePattern = ({ title, subtitle }) => {
    return (
        <div className="hidden lg:flex items-center justify-center bg-gradient-to-br from-blue-50 to-indigo-50 p-12">
            <div className="max-w-md text-center">
                {/* Animated floating letters */}
                <div className="relative mb-10">
                    <div className="flex justify-center items-end space-x-2 mb-6">
                        {/* V - Bouncing */}
                        <div className="w-14 h-14 bg-primary/20 rounded-2xl flex items-center justify-center text-3xl font-bold text-primary animate-bounce" style={{ animationDelay: '0s' }}>
                            V
                        </div>
                        
                        {/* A - Floating */}
                        <div className="w-16 h-16 bg-secondary/20 rounded-2xl flex items-center justify-center text-4xl font-bold text-secondary animate-float" style={{ animationDelay: '0.2s' }}>
                            A
                        </div>
                        
                        {/* R - Spinning */}
                        <div className="w-14 h-14 bg-accent/20 rounded-2xl flex items-center justify-center text-3xl font-bold text-accent animate-spin" style={{ animationDuration: '8s' }}>
                            R
                        </div>
                    </div>
                    
                    <div className="flex justify-center items-end space-x-2">
                        {/* T - Bouncing reverse */}
                        <div className="w-12 h-12 bg-primary/20 rounded-2xl flex items-center justify-center text-2xl font-bold text-primary animate-bounce" style={{ animationDelay: '0.4s', animationDirection: 'reverse' }}>
                            T
                        </div>
                        
                        {/* A - Pulse */}
                        <div className="w-14 h-14 bg-secondary/20 rounded-2xl flex items-center justify-center text-3xl font-bold text-secondary animate-pulse">
                            A
                        </div>
                        
                        {/* L - Floating reverse */}
                        <div className="w-12 h-12 bg-accent/20 rounded-2xl flex items-center justify-center text-2xl font-bold text-accent animate-float" style={{ animationDelay: '0.6s', animationDirection: 'reverse' }}>
                            L
                        </div>
                    </div>
                    
                    {/* App text with fun styling */}
                    <div className="flex justify-center mt-4 space-x-1">
                        <span className="text-5xl font-bold text-primary">A</span>
                        <span className="text-5xl font-bold text-secondary">P</span>
                        <span className="text-5xl font-bold text-accent">P</span>
                    </div>
                </div>

                {/* Text content */}
                <h2 className="text-3xl font-bold text-gray-800 mb-4">{title}</h2>
                <p className="text-gray-600 text-lg">{subtitle}</p>
                
                {/* Decorative elements */}
                <div className="flex justify-center space-x-1 mt-8">
                    <div className="w-2 h-2 bg-primary rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
                    <div className="w-2 h-2 bg-secondary rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                    <div className="w-2 h-2 bg-accent rounded-full animate-bounce" style={{ animationDelay: '0.3s' }}></div>
                </div>
            </div>
        </div>
    );
};

export default AuthImagePattern;